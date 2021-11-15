import { course } from './course.interface';
import { notificationClass } from './notificationClass.interface';
import { studentClass } from './studentClass.interface';
import { teacherClass } from './teacherClass.interface';
import { timeTable } from './timeTable.interface';

export interface classes {
  id: number;
  name: string;
  code: string;
  timetable: timeTable[];
  noti: notificationClass[];
  studentClass: studentClass[];
  teacherClass: teacherClass[];
  createdAt: Date;
  course: course;
}

export interface newClasses {
  name: string;
  course: number;
  code: string;
}
export interface classesEdit {
  name: string;
  id: number;
  code: string;
}
