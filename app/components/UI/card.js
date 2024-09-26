export function Card({ children }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col h-64 justify-between">
            {children}
        </div>
    );
}

export function CardHeader({ children }) {
    return <div className="mb-4 flex-grow-0 text-center">{children}</div>;
}

export function CardContent({ children }) {
    return (
        <div className="flex-grow text-gray-700 text-center flex items-center justify-center">
            <div className="text-base">{children}</div>
        </div>
    );
}

export function CardFooter({ children }) {
    return <div className="mt-4 flex-grow-0 text-center">{children}</div>;
}

export function CardTitle({ children }) {
    return <div className="text-lg font-bold text-center">{children}</div>;
}

export function CardDescription({ children }) {
    return <div className="text-sm text-gray-500 text-center">{children}</div>;
}
