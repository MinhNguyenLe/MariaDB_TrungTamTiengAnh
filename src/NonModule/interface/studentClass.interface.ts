import { user } from './user.interface';

export interface studentClass {
  user: user;
  id: number;
  isPaid: boolean;
  // classId: [number];
}
