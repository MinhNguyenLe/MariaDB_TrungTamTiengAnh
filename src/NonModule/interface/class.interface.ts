import { course } from './course.interface';

export interface classes {
  id: number;
  name: string;
  idRoom: number;
  idNoti: number[];
  createdAt: Date;
  courses: course;
}

export interface newClasses {
  name: string;
  idRoom: number;
  idNoti: number[];
  idCourse: number;
}
export interface classesEdit {
  name: string;
  id: number;
  idRoom: number;
}
