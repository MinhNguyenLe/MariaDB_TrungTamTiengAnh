export interface notificationClass {
  id: number;
  idType: number;
  note: string;
  idComment: number[];
  idClass: number;
}

export interface newNotificationClass {
  idType: number;
  note: string;
  idClass: number;
}

export interface editNotificationClass {
  id: number;
  idType: number;
  note: string;
}
