import { Appointment } from './appointment';
import { Stylist } from './stylist';
import { User } from './user';

export interface CurrentUser {
  id: string;
  name: string;
  role: string;
  permissions: string[];
}

export interface Config {
  shopOpenTime: string;
  shopCloseTime: string;
  slotInterval: number;
}

export interface PendingAction {
  id: string;
  type: 'MOVE_APPOINTMENT';
  payload: {
    appointmentId: string;
    stylistId: string;
    startTime: string;
  };
}

export interface SchedulerStore {
  data: SchedulerState;
  isOffline: boolean;
  pendingActions: PendingAction[];
}

export interface SchedulerState {
  currentUser: CurrentUser;
  config: Config;
  stylists: Stylist[];
  appointments: Appointment[];
}