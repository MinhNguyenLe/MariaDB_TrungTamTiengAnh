import { ClassRoomEntity } from 'src/NonModule/entity/ClassRoom.entity';
export interface timeTable {
  id: number;
  classes: number;
  classroom: ClassRoomEntity;
  begin: number;
  end: number;
  createdAt: Date;
}

export interface createTimeTable {
  classes: number;
  classroom: number;
  begin: number;
  end: number;
}

export interface timeTableSort {
  begin: number;
  end: number;
}
