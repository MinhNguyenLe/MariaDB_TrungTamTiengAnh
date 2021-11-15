import { classes } from './class.interface';
import { commentType } from './comment.interface';
import { notificationType } from './notificationType.interface';
import { studentClass } from './studentClass.interface';
import { teacherClass } from './teacherClass.interface';

export interface notificationClass {
  id: number;
  type: notificationType;
  content: string;
  studentClass: studentClass;
  teacherClass: teacherClass;
  comment: commentType[];
  classes: classes;
  createdAt: Date;
}

export interface newNotificationClass {
  idType: number;
  content: string;
  idClass: number;
}

export interface editNotificationClass {
  id: number;
  idType: number;
  content: string;
}
