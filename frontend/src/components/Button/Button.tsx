const Button = ({
  text,
  loading,
  type,
  fullWidth,
  size,
  onClick,
}: {
  text: string;
  loading?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={loading}
      type={
        type === "button" ? "button" : type === "submit" ? "submit" : "button"
      }
      onClick={onClick}
      className={`${
        size === "sm"
          ? "text-sm"
          : size === "lg"
          ? "text-lg"
          : size === "xl"
          ? "text-xl"
          : size === "2xl"
          ? "text-2xl"
          : "text-base"
      } ${
        fullWidth ? "w-full" : "w-min"
      } flex justify-center whitespace-nowrap rounded-full ${
        !loading ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-500"
      } px-5 py-2 font-semibold text-white transition ${
        loading && "cursor-wait"
      }`}
    >
      {!loading ? (
        text
      ) : (
        <div className="flex flex-row items-center gap-2">
          <span className="animate-spin font-icons text-2xl">refresh</span>
          Loading...
        </div>
      )}
    </button>
  );
};

export default Button;
