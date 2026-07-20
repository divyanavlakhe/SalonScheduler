import { Appointment } from '../types';

interface CheckConflictParams {
  appointments: Appointment[];
  appointmentId: string;
  stylistId: string;
  startTime: string;
}

export const checkAppointmentConflict = ({
  appointments,
  appointmentId,
  stylistId,
  startTime,
}: CheckConflictParams) => {
  return appointments.some(item => {
    if (item.id === appointmentId) {
      return false;
    }

    const itemTime = item.start.substring(11, 16);

    return (
      item.stylistId === stylistId &&
      itemTime === startTime
    );
  });
};