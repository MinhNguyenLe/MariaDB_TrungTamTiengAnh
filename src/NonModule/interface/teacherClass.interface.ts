import { classes } from './class.interface';
import { commentType } from './comment.interface';
import { notificationClass } from './notificationClass.interface';
import { teacher } from './teacher.interface';

export interface teacherClass {
  id: number;
  wage: number;
  bonus: number;
  isPaid: boolean;
  teacher: teacher;
  comment: commentType[];
  noti: notificationClass[];
  classes: classes;
  createdAt: Date;
}
export interface newTeacherClass {
  idStudent: number;
  idClass: number;
  wage: number;
  bonus: number;
  isPaid: boolean;
}
