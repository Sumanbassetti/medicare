import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Appointment,
  AppointmentFormData,
  AppointmentStatus,
  Doctor,
} from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ["Doctor", "Appointment"],
  endpoints: (builder) => ({
    // Get all doctors
    getDoctors: builder.query<Doctor[], void>({
      query: () => "/doctors",
      providesTags: ["Doctor"],
    }),

    // Get doctor by ID
    getDoctorById: builder.query<Doctor, number>({
      query: (id) => `/doctors/${id}`,
      providesTags: ["Doctor"],
    }),

    // Get appointments for a doctor
    getAppointments: builder.query<
      { data: Appointment[]; total: number },
      { doctorId: number; page?: number; pageSize?: number }
    >({
      query: ({ doctorId, page, pageSize }) => {
        let baseUrl = `/appointments?doctorId=${doctorId}`;
        if (page !== undefined && pageSize !== undefined) {
          baseUrl += `&_page=${page}&_limit=${pageSize}`;
        }
        return baseUrl;
      },
      transformResponse: (response: Appointment[], meta) => {
        const total =
          Number(meta?.response?.headers.get("x-total-count")) ||
          response.length;
        return { data: response, total };
      },
      providesTags: ["Appointment"],
    }),

    // Create new appointment
    createAppointment: builder.mutation<
      Appointment,
      AppointmentFormData & { doctorId: number }
    >({
      query: (appointmentData) => ({
        url: "/appointments",
        method: "POST",
        body: {
          ...appointmentData,
          status: AppointmentStatus.CONFIRMED,
          createdAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
} = apiSlice;
