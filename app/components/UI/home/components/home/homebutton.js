"use client";

export function Button({ children, onClick, size, variant }) {
  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const variantClasses =
    variant === "outline"
      ? "border border-gray-400 text-gray-700"
      : "bg-blue-600 text-white";

  return (
    <button
      onClick={onClick}
      className={`rounded-md ${sizeClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
}
