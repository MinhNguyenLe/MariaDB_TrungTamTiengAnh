import { course } from './course.interface';
import { notificationClass } from './notificationClass.interface';
import { studentClass } from './studentClass.interface';
import { user } from './user.interface';
export interface admin {
  id: number;
  user: user;
  createdAt: Date;
}
