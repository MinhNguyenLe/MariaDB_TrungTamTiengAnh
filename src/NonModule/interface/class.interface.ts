import { course } from './course.interface';
import { notificationClass } from './notificationClass.interface';
import { timeTable } from './timeTable.interface';

export interface classes {
  id: number;
  name: string;
  timetable: timeTable[];
  noti: notificationClass[];
  createdAt: Date;
  course: course;
}

export interface newClasses {
  name: string;
  noti: notificationClass[];
  course: course;
}
export interface classesEdit {
  name: string;
  id: number;
}
