import React from "react";

interface InputFieldProps {
  label?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onBlur?: () => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  onBlur,
  className,
}) => (
  <div className="flex flex-col w-full">
    {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
    />
  </div>
);

export default InputField;
