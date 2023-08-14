import { Params, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const loader = async ({ params }: { params: Params }) => {
  const data = axios
    .get(`${process.env.REACT_APP_API}user/${params.nickname}`)
    .then((response) => {
      return response.data;
    });
  return data;
};

type Inputs = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const User = () => {
  const user = useLoaderData() as { name: string; email: string };
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <div className="flex flex-row gap-4">
        <button type="button">Change email</button>
        <button type="button" onClick={() => setShowPasswordModal(true)}>
          Change password
        </button>
      </div>
      {showPasswordModal && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/25 p-8 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-sm flex-col gap-8 rounded-2xl bg-white p-8"
          >
            <p className="text-center text-2xl font-semibold">
              Change password
            </p>
            <div className="flex flex-col gap-4">
              <label>Old password</label>
              <input {...register("oldPassword")} />
              <label>New password</label>
              <input {...register("newPassword")} />
              <label>Confirm new password</label>
              <input {...register("confirmNewPassword")} />
              <input type="submit" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default User;
