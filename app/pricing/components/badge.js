export const Badge = ({ children, className = '' }) => (
    <span className={`bg-yellow-400 text-yellow-900 font-medium px-2 py-1 rounded ${className}`}>
        {children}
    </span>
)
