export interface course {
  id: number;
  name: string;
  information: string;
  classID: number[];
  timeBegin: Date;
  timeEnd: Date;
  createdAt: Date;
}

export interface courseEdit {
  id: number;
  name: string;
  information: string;
  timeBegin: Date;
  timeEnd: Date;
}
