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
  multiChoice:Array<string>;
  scoreProgress:Array<string>;
}

export interface newStudentClass {
  email: string;
  code: string;
  isPaid: boolean;
}
