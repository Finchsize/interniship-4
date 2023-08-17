import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";

type Inputs = {
  nickname: string;
};

export function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ nickname }) => {
    if (typeof nickname != "string") {
      console.log("Form validation error");
    } else {
      try {
        const config = {
          headers: {
            withCredentials: true,
          },
        };
        axios
          .get(process.env.REACT_APP_API + "user/exists/" + nickname)
          .then((response) => {
            const data = response.data;
            if (data == false) {
              navigate("/sign-in/register/" + nickname);
            } else {
              navigate("/sign-in/login/" + nickname);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Sign in or sign up</h1>
        <h2 className="text-lg font-medium text-neutral-700">
          Let's start with your nickname.
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          className="w-full rounded-full px-5 py-2 focus:border-orange-600 focus:ring-orange-600"
          {...register("nickname", {
            required: "Nickname is required",
          })}
          placeholder="Nickname"
        ></input>
        <p>{errors.nickname?.message}</p>
        <Button fullWidth text="Continue" type="submit" />
      </form>
    </div>
  );
}
