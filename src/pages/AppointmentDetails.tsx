import { format } from "date-fns-tz";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CommonTable from "../common/CommonTable";
import { useGetAppointmentsQuery } from "../store/apiSlice";
import { Appointment } from "../types";
import { formatTime } from "../utils/shared";

const PAGE_SIZE = 5;
const AppointmentDetails = () => {
  const { doctorId } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading: appointmentsLoading } = useGetAppointmentsQuery({
    doctorId: +doctorId!,
    page,
    pageSize: PAGE_SIZE,
  });

  const appointments = data?.data ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="mt-6 space-y-6">
      <CommonTable<Appointment>
        data={appointments}
        isLoading={appointmentsLoading}
        columns={[
          {
            key: "patientName",
            label: "Patient Name",
            render: (row) => (
              <div className="flex items-center gap-3 text-[#3D5A6B]">
                <div className="w-10 h-10 rounded-full bg-[#FFBC79] text-white font-semibold flex items-center justify-center uppercase">
                  {row.patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {row.patientName}
                  </span>
                </div>
              </div>
            ),
          },
          {
            key: "date",
            label: "Appointment Time",
            render: (row) => (
              <div className="flex items-center gap-2 text-[#3D5A6B]">
                <span className="text-gray-900 font-medium text-sm">
                  {format(new Date(row.date), "yyyy-MM-dd")}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                  {formatTime(row.startTime)}
                </span>
              </div>
            ),
          },

          { key: "email", label: "Email" },
          { key: "phone", label: "Phone Number" },
        ]}
        paginationEnabled={true}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AppointmentDetails;
