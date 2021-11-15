import { classes } from './class.interface';
import { commentType } from './comment.interface';
import { notificationClass } from './notificationClass.interface';
import { teacher } from './teacher.interface';

export interface teacherClass {
  id: number;
  teacher: teacher;
  wage: number;
  bonus: number;
  classes: classes;
  comment: commentType[];
  noti: notificationClass[];
  createdAt: Date;
}
