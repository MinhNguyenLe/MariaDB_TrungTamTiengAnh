export interface notificationClass {
  id: number;
  typeId: number;
  note: string;
  commentId: number[];
}

export interface newNotificationClass {
  typeId: number;
  note: string;
}

export interface editNotificationClass {
  id: number;
  typeId: number;
  note: string;
}
