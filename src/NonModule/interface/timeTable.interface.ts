export interface timeTable {
  id: number;
  idClass: number;
  idClassRoom: number;
  begin: number;
  end: number;
}

export interface createTimeTable {
  idClass: number;
  idClassRoom: number;
  begin: number;
  end: number;
}

export interface timeTableSort {
  begin: number;
  end: number;
}
