import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

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

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    if (typeof formData.nickname != "string") {
      console.log("Form validation error");
    } else {
      try {
        axios
          .get(process.env.REACT_APP_API + "user/exists/" + formData.nickname)
          .then((response) => {
            const data = response.data;
            if (data == false) {
              navigate("/sign-in/register/" + formData.nickname);
            } else {
              navigate("/sign-in/login/" + formData.nickname);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Nickname"
          {...register("nickname", {
            required: "Nickname is required",
          })}
        />
        <p>{errors.nickname?.message}</p>
        <input type="submit" value="Continue"></input>
      </form>
    </div>
  );
}
