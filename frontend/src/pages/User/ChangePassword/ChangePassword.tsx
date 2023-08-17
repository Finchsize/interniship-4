import Modal from "../../../components/Modal";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

type Inputs = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const ChangePassword = () => {
  const { name } = useParams();
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
    await axios
      .post(`${process.env.REACT_APP_API}/user/change-password`, {
        name: name,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
      .then((response) => {
        console.log(response);
        return response;
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
        <Button text="Continue" type="submit" fullWidth />
      </form>
    </Modal>
  );
};

export default ChangePassword;
