import { teacherClass } from './teacherClass.interface';
import { user } from './user.interface';

export interface teacher {
  user: user;
  id: number;
  level: string;
  certificate: string;
  teacherClass: teacherClass[];
  createdAt: Date;
}
