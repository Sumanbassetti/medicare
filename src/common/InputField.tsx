import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../components/ui/input";

// Props for the reusable InputField component
interface InputFieldProps {
  placeholder?: string; // Placeholder text for the input
  type?: string; // Input type (text, email, tel, etc.)
  registration: UseFormRegisterReturn; // React Hook Form registration object
  error?: FieldError; // Validation error object
}

/**
 * InputField Component
 * Reusable input field integrated with React Hook Form.
 * Displays an input with optional validation error below.
 */
const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  type = "text",
  registration,
  error,
}) => {
  return (
    <div>
      <Input
        type={type}
        placeholder={placeholder}
        className="bg-gray-100 p-4 h-12"
        {...registration}
      />
      {/* Display validation error message if present */}
      {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
