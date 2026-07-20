export type Permission =
  | 'appt.read'
  | 'appt.move'
  | 'appt.create'
  | 'staff.read';

export interface User {
  id: string;
  name: string;
  role: 'manager' | 'staff';
  permissions: Permission[];
}