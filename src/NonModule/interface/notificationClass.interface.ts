import { classes } from './class.interface';
import { commentType } from './comment.interface';
import { notificationType } from './notificationType.interface';

export interface notificationClass {
  id: number;
  type: notificationType;
  content: string;
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
