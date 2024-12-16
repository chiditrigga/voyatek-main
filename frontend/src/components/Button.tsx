import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-medium transition ${
      disabled ? "opacity-50 cursor-not-allowed bg-blue-500" : "bg-blue-600 hover:bg-blue-700"
    } text-white ${className}`}
  >
    {label}
  </button>
);

export default Button;
