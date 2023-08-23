import { useNavigate } from "react-router-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black/25 p-8 backdrop-blur-sm"
      onClick={() => {
        navigate(-1);
      }}
    >
      <div
        className="flex w-full max-w-sm flex-col gap-8 rounded-2xl bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
