import { studentClass } from './studentClass.interface';
import { user } from './user.interface';

export interface student {
  id: number;
  user: user;
  education: string;
  level: string;
  studentClass: studentClass[];
  createdAt: Date;
}
