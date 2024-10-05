"use client";

export default function InputField({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = "text",
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 h-12 text-base rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
