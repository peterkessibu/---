import React from "react";

export function Select({ value, onValueChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full p-2 border rounded-md"
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className = "" }) {
  return (
    <div className={`relative cursor-pointer ${className}`}>{children}</div>
  );
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
