const Button = ({
  text,
  type,
  fullWidth,
  size,
  onClick,
}: {
  text: string;
  fullWidth?: boolean;
  type?: "primary" | "secondary";
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  onClick?: () => void;
}) => {
  return (
    <button
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
      } flex justify-center whitespace-nowrap rounded-full bg-orange-600 px-5 py-2 font-semibold text-white transition hover:bg-orange-700`}
    >
      {text}
    </button>
  );
};

export default Button;
