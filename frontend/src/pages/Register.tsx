import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Cookies from "universal-cookie";
import isEmail from "validator/lib/isEmail";
import Button from "../components/Button";

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
      axios
        .post(process.env.REACT_APP_API + "user/register", payload)
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
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">
          Welcome, <span className="text-orange-600">{nickname}!</span>
        </h1>
        <h2 className="text-lg font-medium text-neutral-700">
          Add your information below to finish setting up your account.
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <input
            placeholder="Email"
            className="w-full rounded-full px-5 py-2 focus:border-orange-600 focus:ring-orange-600"
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
            className="w-full rounded-full px-5 py-2 focus:border-orange-600 focus:ring-orange-600"
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
            className="w-full rounded-full px-5 py-2 focus:border-orange-600 focus:ring-orange-600"
            {...register("confirm_password", {
              required: "You must confirm the password",
              validate: (value: string) => {
                if (value != watch("password"))
                  return "Your passwords do no match";
              },
            })}
          />
          <p>{errors.confirm_password?.message}</p>
        </div>
        <Button text="Register" type="submit" fullWidth />
      </form>
    </div>
  );
}
