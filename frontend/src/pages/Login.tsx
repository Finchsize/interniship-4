import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";

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
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">
          Welcome back, <span className="text-orange-600">{nickname}!</span>
        </h1>
        <h2 className="text-lg font-medium text-neutral-700">
          Input your password to sign into your account.
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <input
            type="password"
            className="w-full rounded-full px-5 py-2 focus:border-orange-600 focus:ring-orange-600"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <p className="text-xs text-red-600">{errors.password?.message}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button type="submit" text="Sign In" fullWidth />
          <Link
            to="/reset-password"
            className="font-semibold text-orange-600 transition hover:text-orange-700"
          >
            Reset password
          </Link>
        </div>
      </form>
    </div>
  );
}
