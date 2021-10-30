import { classes } from './class.interface';

export interface course {
  id: number;
  name: string;
  information: string;
  level: string;
  docs: string;
  members: number;
  tuition: number;
  classes: classes[];
  timeBegin: Date;
  timeEnd: Date;
  createdAt: Date;
}

export interface newCourse {
  name: string;
  information: string;
  level: string;
  docs: string;
  members: number;
  tuition: number;
  classes: classes[];
  timeBegin: Date;
  timeEnd: Date;
}

export interface courseEdit {
  id: number;
  name: string;
  level: string;
  docs: string;
  members: number;
  tuition: number;
  information: string;
  timeBegin: Date;
  timeEnd: Date;
}
