import { notificationClass } from './notificationClass.interface';
import { studentClass } from './studentClass.interface';
import { teacherClass } from './teacherClass.interface';
import { user } from './user.interface';

export interface commentType {
  id: number;
  content: string;
  noti: notificationClass;
  studentClass: studentClass;
  teacherClass: teacherClass;
  createdAt: Date;
}
