export const Input = ({ className = "", ...props }) => (
  <input
    className={`border border-gray-300 px-4 py-2 rounded w-full ${className}`}
    {...props}
  />
);
