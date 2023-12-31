import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

type Inputs = {
  email: string;
};

export function ResetPassword() {
  const [tempPassword, setTempPassword] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ email }) => {
    if (typeof email != "string") {
      console.log("Form validation error");
    } else {
      axios
        .put(process.env.REACT_APP_API + "user/reset-password", {
          email: email,
        })
        .then((response) => {
          const data = response.data;
          setTempPassword("Your temporary password: " + data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 404)
            setTempPassword("No user found with specified email address");
          else setTempPassword("Unknown error");
        });
    }
  };

  return (
    <div>
      <p>Insert your account's email</p>
      {!tempPassword ? (
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
          <input type="submit" value="Send"></input>
        </form>
      ) : (
        <>
          <p>{tempPassword}</p>
          {tempPassword == "No user found with specified email address" ? (
            <button
              onClick={() => {
                setTempPassword(undefined);
              }}
            >
              Try again
            </button>
          ) : (
            <Link to="/sign-in">Take me to sign in page</Link>
          )}
        </>
      )}
    </div>
  );
}
