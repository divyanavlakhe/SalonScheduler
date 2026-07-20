import { Appointment, Stylist } from '../types';
import { TimeSlot } from './generateSlots';

export interface TimelineItem {
  time: string;
  label: string;
  appointment: Appointment | null;
}

export interface TimelineSection {
  id: string;
  title: string;
  color: string;
  data: TimelineItem[];
}

export const buildTimeline = (
  stylists: Stylist[],
  appointments: Appointment[],
  slots: TimeSlot[],
): TimelineSection[] => {
  return stylists.map(stylist => ({
    id: stylist.id,
    title: stylist.name,
    color: stylist.color,

    data: slots.map(slot => {
      const appointment =
        appointments.find(item => {
          const start = item.start.substring(11, 16);

          return (
            item.stylistId === stylist.id &&
            start === slot.value
          );
        }) || null;

      return {
        time: slot.value,
        label: slot.label,
        appointment,
      };
    }),
  }));
};