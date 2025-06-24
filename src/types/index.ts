export interface Identifiable {
  id: number;
}
export interface Doctor extends Identifiable {
  name: string;
  specialty: string;
  image: string;
  experience: string;
  rating: number;
  consultationFee: number;
}

export interface Appointment extends Identifiable {
  doctorId: number;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface AppointmentFormData {
  patientName: string;
  email: string;
  phone: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
export enum AppointmentStatus {
  CONFIRMED,
  PENDING,
  CANCELLED,
}
export interface Time {
  hour: number;
  minute: number;
  ampm: "AM" | "PM";
}
