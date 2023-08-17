import Modal from "../../../components/Modal";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
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
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <p className="text-center text-2xl font-semibold">Change password</p>
          <button className="font-icons text-4xl" onClick={onClose}>
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
  );
};

export default ChangePassword;
