import { notificationClass } from './notificationClass.interface';
import { classes } from './class.interface';
import { student } from './student.interface';
import { commentType } from './comment.interface';

export interface studentClass {
  id: number;
  student: student;
  classes: classes;
  isPaid: boolean;
  comment: commentType[];
  noti: notificationClass[];
  createdAt: Date;
}

export interface newStudentClass {
  idStudent: number;
  idClass: number;
  isPaid: boolean;
}
