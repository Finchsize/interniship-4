import Modal from "../../../components/Modal";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import { redirect, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { NameContext } from "../Profile";

interface Inputs {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const name = useContext(NameContext);
  const navigate = useNavigate();
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
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}user/change-password`,
        {
          nickname: name,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        { withCredentials: true },
      )
      .then(() => {
        setLoading(false);
        navigate("/profile");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 409) {
          setError("oldPassword", {
            type: "value",
            message: "Old password does not match",
          });
        }
      });
  };
  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <p className="text-center text-2xl font-semibold">Change password</p>
          <button onClick={() => navigate(-1)} className="font-icons text-4xl">
            clear
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Old password</label>
            <input
              type="password"
              className="w-full rounded-full px-5 py-2 text-sm focus:border-orange-600 focus:ring-orange-600"
              {...register("oldPassword", { required: true })}
            />
            {errors.oldPassword && (
              <p className="text-xs text-red-600">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm">New password</label>
            <input
              type="password"
              className="w-full rounded-full px-5 py-2 text-sm focus:border-orange-600 focus:ring-orange-600"
              {...register("newPassword", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Confirm new password</label>
            <input
              type="password"
              className="w-full rounded-full px-5 py-2 text-sm focus:border-orange-600 focus:ring-orange-600"
              {...register("confirmNewPassword", { required: true })}
            />
            {errors.confirmNewPassword && (
              <p className="text-xs text-red-600">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </div>
        <Button text="Continue" type="submit" fullWidth loading={loading} />
      </form>
    </Modal>
  );
};

export default ChangePassword;
