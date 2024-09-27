"use client";

export function Input({ id, value, onChange, placeholder, type = "text" }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md focus:outline-none"
    />
  );
}
