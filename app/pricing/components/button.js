export const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClass = "px-4 py-2 rounded text-white font-medium";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
  };
  return (
    <button
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
