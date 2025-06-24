import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { emailRegex, phoneRegex } from "../utils/constant";
import InputField from "./InputField";

// Defines the shape of form values used in appointment booking.
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Props passed to the AppointmentForm component from parent.
interface AppointmentFormProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

/**
 * Renders a form with validated fields for first name, last name, email, and phone.
 */
const AppointmentForm: React.FC<AppointmentFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        placeholder="Enter first name"
        registration={register("firstName", {
          required: "First name is required",
        })}
        error={errors.firstName}
      />

      <InputField
        placeholder="Enter last name"
        registration={register("lastName", {
          required: "Last name is required",
        })}
        error={errors.lastName}
      />

      <InputField
        placeholder="Enter email"
        type="email"
        registration={register("email", {
          required: "Email is required",
          pattern: {
            value: emailRegex,
            message: "Enter a valid email address",
          },
        })}
        error={errors.email}
      />

      <InputField
        placeholder="Enter phone number"
        type="tel"
        registration={register("phone", {
          required: "Phone number is required",
          pattern: {
            value: phoneRegex,
            message: "Enter a valid phone number",
          },
        })}
        error={errors.phone}
      />
    </div>
  );
};

export default AppointmentForm;
