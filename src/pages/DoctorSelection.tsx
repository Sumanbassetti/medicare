import DoctorCard from "../common/DoctorCard";
import { useGetDoctorsQuery } from "../store/apiSlice";

const DoctorSelection = () => {
  const { data: doctors, isLoading, error } = useGetDoctorsQuery();

  // Loading state: show skeleton placeholders
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Select a Doctor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state: json-server is likely down
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Error Loading Doctors
        </h3>
        <p className="text-gray-600">
          Please ensure the JSON server is running on port 3001.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Run:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            json-server --watch data.json --port 3001
          </code>
        </p>
      </div>
    );
  }

  // Main render
  return (
    <div className="space-y-4">
      {/* Title & Subtitle */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Choose Your Doctor
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our team of experienced healthcare professionals to book
          your appointment.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors?.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {/* Help Info */}
      <div className="text-center mt-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Need Help Choosing?
          </h3>
          <p className="text-blue-700 text-sm">
            All our doctors are highly qualified and experienced. You can view
            their specialties, ratings, and consultation fees to make the best
            choice for your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorSelection;
