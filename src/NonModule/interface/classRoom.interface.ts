export interface classRoom {
  id: number;
  name: string;
  address: string; // location in Center
  timeTable: string[];
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
  timeTable: string[];
}
