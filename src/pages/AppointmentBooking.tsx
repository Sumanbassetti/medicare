import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import AppointmentForm from "../common/AppointmentForm";
import DatePicker from "../common/DatePicker";
import TimePicker from "../common/TimePicker";
import { Button } from "../components/ui/button";
import {
  useCreateAppointmentMutation,
  useGetAppointmentsQuery,
} from "../store/apiSlice";
import { getTomorrowMidnight } from "../utils/shared";

// Type definition for form values
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const AppointmentBooking = () => {
  // Local state for selected date and time slot
  const [selectedDate, setSelectedDate] = useState<Date>(getTomorrowMidnight);
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:30");
  const [submitted, setSubmitted] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Get doctor ID from route params
  const { doctorId } = useParams();
  const navigate = useNavigate();

  // React Hook Form for handling inputs and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  // Fetch existing appointments for the selected doctor
  const { data } = useGetAppointmentsQuery({
    doctorId: +doctorId!,
  });

  // Mutation hook to create new appointment
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  // Submit handler for the form
  const onSubmit = async (formData: FormValues) => {
    const payload = {
      email: formData.email,
      phone: formData.phone,
      date: selectedDate.toISOString(),
      startTime,
      endTime,
      doctorId: +doctorId!,
      patientName: `${formData.firstName} ${formData.lastName}`,
    };

    // Prevent submission if slot is already booked
    if (isBooked) {
      toast.error("This time slot is already booked. Please choose another.");
      return;
    }

    // Attempt to create the appointment
    try {
      await createAppointment(payload).unwrap();
      toast.success("Appointment booked successfully!");
      setSubmitted(true);
      navigate(`/details/${doctorId}`);
      setTimeout(() => setSubmitted(false), 5000);
      reset();
    } catch (error) {
      console.error("Appointment submission failed:", error);
    }
  };

  return (
    <div className="screen bg-white p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section: Date Picker */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-4">Choose Date</h1>
          <DatePicker
            selectedDate={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
          />
        </div>

        {/* Right Section: Time Picker and Form */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">Choose Time</h1>
          <p className="text-sm text-gray-500 mb-4">
            Set time by clicking the following:
          </p>

          {/* Time Selection */}
          <div className="flex gap-4 mb-2">
            <TimePicker
              selectedDate={selectedDate.toISOString()}
              appointments={data?.data || []}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setIsBooked={setIsBooked}
            />
          </div>

          {/* Appointment Details Form */}
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AppointmentForm register={register} errors={errors} />
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-6 h-10 px-6 text-base bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>

          {/* Submission Confirmation */}
          {submitted && (
            <p className="text-green-600 mt-4 font-medium">
              Appointment submitted successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
