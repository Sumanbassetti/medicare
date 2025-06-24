import * as React from "react";
import "react-day-picker/dist/style.css";
import { Calendar } from "../components/ui/calendar";

// Props interface for the DatePicker component
interface DatePickerProps {
  selectedDate: Date; // Currently selected date
  onSelect: (date: Date) => void; // Callback triggered when a date is selected
}

/**
 * DatePicker Component
 * A date picker that allows selecting future dates only (starting tomorrow).
 * Converts selected date to the Asia/Kolkata time zone and applies consistent calendar styling.
 */
const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onSelect }) => {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      fixedWeeks // Display calendar with fixed number of rows
      onSelect={(date) => {
        if (date) onSelect(date); // Convert selected date to IST
      }}
      disabled={{
        before: new Date(new Date().setHours(24, 0, 0, 0)), // Disable today and past dates
      }}
      className="w-full max-w-sm h-[440px] rounded-xl bg-white shadow-md px-4 py-2 mx-auto"
      classNames={{
        day: "h-12 w-12 text-base rounded-full p-0 flex items-center justify-center mx-auto hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        selected: "bg-blue-500 text-white rounded-full hover:bg-blue-600",
        today: "text-blue-600 font-semibold",
        table: "w-full table-fixed border-separate border-spacing-y-2",
        cell: "text-center align-middle p-0",
      }}
    />
  );
};

export default DatePicker;
