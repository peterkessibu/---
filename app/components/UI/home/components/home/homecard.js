"use client";

export function Card({ children }) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-sm">
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
