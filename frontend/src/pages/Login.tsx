import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
  password: string;
};

export function Login() {
  const { nickname } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ password }) => {
    if (typeof password != "string") {
      console.log("Form validation error");
    } else {
      const payload = {
        name: nickname,
        password: password,
      };
      axios
        .post(process.env.REACT_APP_API + "user/login", payload, {withCredentials: true})
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
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
        <br />
        <Link to="/reset-password">Reset password</Link>
      </form>
    </div>
  );
}
