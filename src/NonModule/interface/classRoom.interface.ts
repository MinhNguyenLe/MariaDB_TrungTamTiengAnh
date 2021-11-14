import { timeTableSort, timeTable } from './timeTable.interface';

export interface classRoom {
  id: number;
  name: string;
  address: string; // location in Center
  timetable: timeTable[];
  createdAt: Date;
}

export interface newClassRoom {
  name: string;
  address: string;
}

export interface editClassRoom {
  name: string;
  id: number;
  address: string;
}

export interface addTimeTableRoom {
  id: number;
  idClass: number;
  timetable: timeTableSort[];
}
export interface deleteTimeTableRoom {
  id: number;
  idTimeTable: number;
}
