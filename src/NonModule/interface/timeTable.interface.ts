import { classes } from './class.interface';
import { classRoom } from './classRoom.interface';
export interface timeTable {
  id: number;
  classes: classes;
  classroom: classRoom;
  begin: number;
  end: number;
  createdAt: Date;
}

export interface createTimeTable {
  classes: classes;
  classroom: classRoom;
  begin: number;
  end: number;
}

export interface timeTableSort {
  begin: number;
  end: number;
}
