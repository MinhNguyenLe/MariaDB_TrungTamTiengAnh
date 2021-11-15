import { studentClass } from './studentClass.interface';
import { user } from './user.interface';

export interface student {
  user: user;
  id: number;
  level: string;
  education: string;
  studentClass: studentClass[];
  createdAt: Date;
}
