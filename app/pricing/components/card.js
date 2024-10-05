export const Card = ({ children, className = '', ...props }) => (
    <div className={`bg-white shadow-lg rounded-lg ${className}`} {...props}>
        {children}
    </div>
)

export const CardHeader = ({ children }) => (
    <div className="p-6 border-b border-gray-200">{children}</div>
)

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-xl font-bold ${className}`}>{children}</h3>
)

export const CardDescription = ({ children }) => (
    <p className="mt-2 text-gray-600">{children}</p>
)

export const CardContent = ({ children }) => (
    <div className="p-6 flex-grow">{children}</div>
)

export const CardFooter = ({ children }) => (
    <div className="p-6 border-t border-gray-200">{children}</div>
)
