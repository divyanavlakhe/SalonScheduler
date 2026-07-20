export type AppointmentStatus =
  | 'confirmed'
  | 'pending'
  | 'completed'
  | 'cancelled';

export interface Appointment {
  id: string;
  stylistId: string;
  clientName: string;
  start: string;
  end: string;
  status: AppointmentStatus;
}
