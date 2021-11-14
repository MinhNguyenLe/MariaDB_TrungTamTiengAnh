import { notificationClass } from './notificationClass.interface';
import { user } from './user.interface';

export interface commentType {
  id: number;
  content: string;
  noti: notificationClass;
  user: user;
  createdAt: Date;
}
