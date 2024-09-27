"use client";

export function Select({ value, onValueChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
      >
        {children}
      </select>
    </div>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
