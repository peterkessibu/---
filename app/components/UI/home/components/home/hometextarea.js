"use client";

export function Textarea({ id, value, onChange, placeholder, rows }) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 border rounded-md focus:outline-none"
    />
  );
}
