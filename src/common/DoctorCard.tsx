import React from "react";
import { useNavigate } from "react-router-dom";
import { Doctor } from "../types";

// Props for the DoctorCard component
interface DoctorCardProps {
  doctor: Doctor; // Doctor object to display
  isSelected?: boolean; // Optional: highlights the card if selected
}

/**
 * DoctorCard Component
 * Displays a doctor's profile with name, specialty, rating, experience, and consultation fee.
 * Navigates to appointment booking on click, passing doctor details in location state.
 */
const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, isSelected }) => {
  const navigate = useNavigate();

  /**
   * Navigate to appointment booking page with selected doctor data.
   * @param doctor - The doctor object selected
   */
  const onDoctorSelection = (doctor: Doctor) => {
    navigate(`/appointment/${doctor.id}`, { state: { doctor } });
  };

  return (
    <div
      className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={() => onDoctorSelection(doctor)}
    >
      <div className="text-center">
        {/* Doctor Image + Selection Tick */}
        <div className="relative mx-auto mb-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-md"
          />
          {isSelected && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Doctor Name & Specialty */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-sm text-blue-600 font-medium mb-2">
          {doctor.specialty}
        </p>

        {/* Rating Display */}
        <div className="flex items-center justify-center space-x-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(doctor.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">({doctor.rating})</span>
        </div>

        {/* Experience and Fee */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">
            {doctor.experience} experience
          </p>
          <p className="text-lg font-bold text-green-600">
            ${doctor.consultationFee}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
