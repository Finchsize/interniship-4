import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Cookies from "universal-cookie";
import validator from "validator";
import isEmail from "validator/lib/isEmail";

type Inputs = {
  email: string;
  password: string;
  confirm_password: string;
};

export function Register() {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    if (
      typeof formData.email != "string" ||
      typeof formData.password != "string" ||
      typeof formData.confirm_password != "string"
    ) {
      console.log("Form validation error");
    } else {
      const payload = {
        name: nickname,
        email: formData.email,
        password: formData.password,
      };
      try {
        axios
          .post(process.env.REACT_APP_API + "user/register", payload)
          .then((response) => {
            const jwtToken = response.data;
            if (typeof jwtToken != "string") {
              console.log(response.status);
            } else {
              cookies.set("jwt", jwtToken, {
                expires: new Date(Date.now() + 5 * 60 * 1000),
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
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            validate: (value: string) => {
              if (!isEmail(value)) return "Incorrect email";
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <input
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum password length is 8",
            },
          })}
        />
        <p>{errors.password?.message}</p>
        <input
          placeholder="Confirm password"
          {...register("confirm_password", {
            required: "You must confirm the password",
            validate: (value: string) => {
              if (value != watch("password"))
                return "Your passwords do no match";
            },
          })}
        />
        <p>{errors.confirm_password?.message}</p>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
