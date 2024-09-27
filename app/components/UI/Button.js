// components/ui/button.js
export function Button({ children, className, ...props }) {
  return (
    <button className={`py-2 px-4 rounded ${className}`} {...props}>
      {children}
    </button>
  );
}
