import Modal from "../../../components/Modal";
import axios from "axios";
import { useContext, useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NameContext } from "../User";
import Button from "../../../components/Button/Button";

type Inputs = {
  email: string;
};

const ChangeEmail = ({ onClose }: { onClose: () => void }) => {
  const username = useContext(NameContext);
  const id = useId();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API}user/change-email`, {
        name: username,
        email: data.email,
      })
      .then((response) => {
        console.log(response);
        return response;
      });
  };
  return (
    <Modal>
      <div className="space-y-8">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <p className="text-center text-2xl font-semibold">Change email</p>
          <button className="font-icons text-4xl" onClick={onClose}>
            clear
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            id={id}
            type="email"
            className="w-full rounded-full px-5 py-2 text-sm focus:border-orange-600 focus:ring-orange-600"
            placeholder="Enter your new email"
            {...register("email")}
          />
          <Button type="submit" text="Continue" fullWidth />
        </form>
      </div>
    </Modal>
  );
};

export default ChangeEmail;
