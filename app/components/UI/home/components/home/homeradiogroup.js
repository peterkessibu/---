"use client";
import React from "react";
export function RadioGroup({ value, onValueChange, children }) {
  return (
    <div className="space-y-4">
      {children.map((child) =>
        React.cloneElement(child, {
          checked: value === child.props.value,
          onChange: () => onValueChange(child.props.value),
        }),
      )}
    </div>
  );
}

export function RadioGroupItem({ id, value, checked, onChange }) {
  return (
    <input
      id={id}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
    />
  );
}
