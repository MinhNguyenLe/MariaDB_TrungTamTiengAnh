import { notificationClass } from './notificationClass.interface';
import { classes } from './class.interface';
import { student } from './student.interface';
import { user } from './user.interface';
import { commentType } from './comment.interface';

export interface studentClass {
  id: number;
  student: student;
  isPaid: boolean;
  classes: classes;
  comment: commentType[];
  noti: notificationClass[];
  createdAt: Date;
}
