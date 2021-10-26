export interface classes {
  id: number;
  name: string;
  roomId: number;
  notiId: number;
  createdAt: Date;
  courseId: number;
}

export interface newClasses {
  name: string;
  roomId: number;
  notiId: number;
  courseId: number;
}
export interface classesEdit {
  name: string;
  id: number;
  roomId: number;
}
