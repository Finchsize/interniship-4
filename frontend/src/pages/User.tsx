import { Params, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
<<<<<<< HEAD

export const loader = async ({ params }: { params: Params }) => {
  const data = axios
=======
import Modal from "../components/Modal";

export const loader = async ({ params }: { params: Params }) => {
  const data = await axios
>>>>>>> 47019b670e9c0717f344c11f1cfb6cebad20865f
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
<<<<<<< HEAD
=======
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
>>>>>>> 47019b670e9c0717f344c11f1cfb6cebad20865f

  const {
    register,
    handleSubmit,
    formState: { errors },
<<<<<<< HEAD
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
=======
    setError,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      setError("confirmNewPassword", {
        type: "value",
        message: "Passwords do not match",
      });
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_API}/user/change-password`)
      .then((response) => {
        console.log(response);
        return response;
      });
  };
>>>>>>> 47019b670e9c0717f344c11f1cfb6cebad20865f
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <div className="flex flex-row gap-4">
<<<<<<< HEAD
        <button type="button">Change email</button>
=======
        <button type="button" onClick={() => setShowEmailModal(true)}>
          Change email
        </button>
>>>>>>> 47019b670e9c0717f344c11f1cfb6cebad20865f
        <button type="button" onClick={() => setShowPasswordModal(true)}>
          Change password
        </button>
      </div>
      {showPasswordModal && (
<<<<<<< HEAD
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
=======
        <Modal>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex w-full flex-row items-center justify-between gap-4">
              <p className="text-center text-2xl font-semibold">
                Change password
              </p>
              <button
                className="font-icons text-4xl"
                onClick={() => setShowPasswordModal(false)}
              >
                clear
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <label>Old password</label>
              <input
                type="password"
                {...register("oldPassword", { required: true })}
              />
              <label>New password</label>
              <input
                type="password"
                {...register("newPassword", { required: true })}
              />
              <label>Confirm new password</label>
              <input
                type="password"
                {...register("confirmNewPassword", { required: true })}
              />
              {errors.confirmNewPassword && (
                <p className="text-xs text-red-600">
                  {errors.confirmNewPassword.message}
                </p>
              )}
              <input type="submit" />
            </div>
          </form>
        </Modal>
      )}
      {showEmailModal && (
        <Modal>
          <form className="flex flex-col gap-8">
            <div className="flex w-full flex-row items-center justify-between gap-4">
              <p className="text-center text-2xl font-semibold">Change email</p>
              <button
                className="font-icons text-4xl"
                onClick={() => setShowEmailModal(false)}
              >
                clear
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <label>Provide new email</label>
              <input type="email" title="email" />
              <input type="submit" />
            </div>
          </form>
        </Modal>
>>>>>>> 47019b670e9c0717f344c11f1cfb6cebad20865f
      )}
    </div>
  );
};

export default User;
