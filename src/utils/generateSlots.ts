export interface TimeSlot {
  id: string;
  value: string;
  label: string;
}

export const generateTimeSlots = (
  start: string,
  end: string,
  interval: number,
): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);

  const current = new Date();
  current.setHours(startHour, startMinute, 0, 0);

  const finish = new Date();
  finish.setHours(endHour, endMinute, 0, 0);

  while (current < finish) {
    const value = `${String(current.getHours()).padStart(2, '0')}:${String(
      current.getMinutes(),
    ).padStart(2, '0')}`;

    const label = current.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    slots.push({
      id: value,
      value,
      label,
    });

    current.setMinutes(current.getMinutes() + interval);
  }

  return slots;
};