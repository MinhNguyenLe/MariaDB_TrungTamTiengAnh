import { notificationClass } from './notificationClass.interface';
import { studentClass } from './studentClass.interface';
import { teacherClass } from './teacherClass.interface';
import { user } from './user.interface';

export interface commentType {
  id: number;
  content: string;
  studentClass: studentClass;
  teacherClass: teacherClass;
  noti: notificationClass;
  createdAt: Date;
}

export interface newComment {
  content: string;
  role: string;
  idNoti: number;
  idUserClass: number;
}

export interface editComment {
  content: string;
  id: number;
}
