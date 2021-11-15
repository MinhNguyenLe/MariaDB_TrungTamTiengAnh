import { classes } from './class.interface';
import { commentType } from './comment.interface';
import { notificationClass } from './notificationClass.interface';
import { teacher } from './teacher.interface';

export interface teacherClass {
  id: number;
  wage: number;
  bonus: number;
  teacher: teacher;
  comment: commentType[];
  noti: notificationClass[];
  classes: classes;
  createdAt: Date;
}
