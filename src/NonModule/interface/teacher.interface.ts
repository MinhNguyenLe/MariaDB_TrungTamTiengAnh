import { user } from './user.interface';

export interface teacher {
  user: user;
  id: number;
  wage: number;
  subWage: number;
  workTime: number;
  classId: [number];
}
