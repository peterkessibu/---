import React from "react";

export function Card({ children }) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">{children}</div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`font-bold text-lg ${className}`}>{children}</h2>;
}
