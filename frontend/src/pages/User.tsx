import { Params, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../components/Modal";

export const loader = async ({ params }: { params: Params }) => {
  // TODO: Before loading the user data, check if the page belongs to the current user
  const data = await axios
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
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <div className="flex flex-row gap-4">
        <button type="button" onClick={() => setShowEmailModal(true)}>
          Change email
        </button>
        <button type="button" onClick={() => setShowPasswordModal(true)}>
          Change password
        </button>
      </div>
      {showPasswordModal && (
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
      )}
    </div>
  );
};

export default User;
