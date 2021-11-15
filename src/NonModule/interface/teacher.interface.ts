import { teacherClass } from './teacherClass.interface';
import { user } from './user.interface';

export interface teacher {
  id: number;
  user: user;
  teacherClass: teacherClass[];
  certificate: string;
  level: string;
  createdAt: Date;
}
