const Modal = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/25 p-8 backdrop-blur-sm">
    <div className="flex w-full max-w-sm flex-col gap-8 rounded-2xl bg-white p-8">
      {children}
    </div>
  </div>
);

export default Modal;
