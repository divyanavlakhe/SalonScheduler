import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '../data/mockData';
import {
  SchedulerStore,
  PendingAction,
} from '../types';

const initialState: SchedulerStore = {
  data: mockData,
  isOffline: false,
  pendingActions: [],
};

// Local DateTime Formatter
const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};

const schedulerSlice = createSlice({
  name: 'scheduler',
  initialState,

  reducers: {
    setOffline(state, action: PayloadAction<boolean>) {
      state.isOffline = action.payload;
    },

    queueAction(
      state,
      action: PayloadAction<PendingAction>,
    ) {
      state.pendingActions.push(action.payload);
    },

    clearPendingActions(state) {
      state.pendingActions = [];
    },

    syncPendingActions(state) {
      state.pendingActions = [];
    },

    moveAppointment(
      state,
      action: PayloadAction<{
        appointmentId: string;
        stylistId: string;
        startTime: string;
      }>,
    ) {
      const {
        appointmentId,
        stylistId,
        startTime,
      } = action.payload;

      const appointment =
        state.data.appointments.find(
          item => item.id === appointmentId,
        );

      if (!appointment) {
        return;
      }

      // Existing appointment duration
      const oldStart = new Date(appointment.start);
      const oldEnd = new Date(appointment.end);

      const duration =
        oldEnd.getTime() - oldStart.getTime();

      // Keep same date
      const date =
        appointment.start.split('T')[0];

      const newStart = new Date(
        `${date}T${startTime}:00`,
      );

      const newEnd = new Date(
        newStart.getTime() + duration,
      );

      // Update appointment
      appointment.stylistId = stylistId;
      appointment.start = formatDateTime(newStart);
      appointment.end = formatDateTime(newEnd);
    },
  },
});

export const {
  setOffline,
  moveAppointment,
  queueAction,
  clearPendingActions,
  syncPendingActions,
} = schedulerSlice.actions;

export default schedulerSlice.reducer;