export interface course {
  id: number;
  name: string;
  information: string;
  idClass: number[];
  timeBegin: Date;
  timeEnd: Date;
  createdAt: Date;
}

export interface newCourse {
  name: string;
  information: string;
  idClass: number[];
  timeBegin: Date;
  timeEnd: Date;
}

export interface courseEdit {
  id: number;
  name: string;
  information: string;
  timeBegin: Date;
  timeEnd: Date;
}
