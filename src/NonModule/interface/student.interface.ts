import { user } from './user.interface';

export interface student {
  user: user;
  id: number;
  isPaid: boolean;
  // classId: [number];
}
