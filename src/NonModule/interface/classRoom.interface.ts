import { timeTableSort } from './timeTable.interface';

export interface classRoom {
  id: number;
  name: string;
  address: string; // location in Center
  timeTable: number[];
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

export interface editTimeTableRoom {
  id: number;
  timeTable: timeTableSort[];
}
export interface deleteTimeTableRoom {
  id: number;
  idTimeTable: number;
}
