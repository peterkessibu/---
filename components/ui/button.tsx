export function Button({ children, disabled, type }: { children: React.ReactNode, disabled?: boolean, type?: 'submit' | 'button' }) {
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  )
}
