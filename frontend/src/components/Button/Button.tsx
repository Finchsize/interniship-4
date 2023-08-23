import "./Button.css";

const Button = ({
  text,
  loading,
  type,
  fullWidth,
  size,
  onClick,
  disabled,
  color,
  variant,
}: {
  text: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  onClick?: () => void;
  disabled?: boolean;
  color?: "primary" | "danger";
  variant?: "solid" | "outlined";
}) => {
  return (
    <button
      disabled={loading || disabled}
      type={
        type === "button" ? "button" : type === "submit" ? "submit" : "button"
      }
      onClick={onClick}
      className={`
      flex justify-center whitespace-nowrap rounded-full px-5 py-2 font-semibold transition
      ${
        // Set color
        color === "primary"
          ? "primary"
          : color === "danger"
          ? "danger"
          : "primary"
      }
      ${
        // Set variant
        variant === "outlined" ? "outlined" : "solid"
      }
      ${
        // Set button size
        size === "sm"
          ? "text-sm"
          : size === "lg"
          ? "text-lg"
          : size === "xl"
          ? "text-xl"
          : size === "2xl"
          ? "text-2xl"
          : "text-base"
      }
      ${
        // Set full width
        fullWidth ? "w-full" : "w-min"
      }
      ${loading && "cursor-wait"}`}
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
