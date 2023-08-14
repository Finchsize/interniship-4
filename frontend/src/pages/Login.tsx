import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

type Inputs = {
  password: string;
};

export function Login() {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  interface Token {
    id: number;
    exp: number;
    iat: number;
  }

  const onSubmit: SubmitHandler<Inputs> = ({ password }) => {
    if (typeof password != "string") {
      console.log("Form validation error");
    } else {
      const payload = {
        name: nickname,
        password: password,
      };
      try {
        axios
          .post(process.env.REACT_APP_API + "user/login", payload)
          .then((response) => {
            const jwtToken = response.data;
            if (typeof jwtToken != "string") {
              console.log(response.status);
            } else {
              const jwtDecoded = jwt<Token>(jwtToken);
              cookies.set("jwt", jwtToken, {
                expires: new Date(jwtDecoded.exp * 1000),
                secure: true,
                httpOnly: true,
                sameSite: "lax",
              });
              navigate("/");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <p>{errors.password?.message}</p>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}
