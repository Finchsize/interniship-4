import Modal from "../../../components/Modal";
import axios from "axios";
import { useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { NameContext } from "../Profile";

interface Inputs {
  email: string;
}

const ChangeEmail = () => {
  const [loading, setLoading] = useState(false);
  const name = useContext(NameContext);
  const navigate = useNavigate();
  const id = useId();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}user/change-email`,
        {
          name: name,
          email: data.email,
        },
        { withCredentials: true },
      )
      .then(() => {
        setLoading(false);
        navigate("/profile");
      });
  };
  return (
    <Modal>
      <div className="space-y-8">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <p className="text-center text-2xl font-semibold">Change email</p>
          <button className="font-icons text-4xl" onClick={() => navigate(-1)}>
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
          <Button type="submit" text="Continue" fullWidth loading={loading} />
        </form>
      </div>
    </Modal>
  );
};

export default ChangeEmail;
