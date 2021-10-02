export interface user {
  id: number;
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
  surName: string;
  lastName: string;
  dateBirth: string;
  placeBirth: string;
  gender: string;
  address: string;
  roleId: number;
}

export interface studentClass {
  user: user;
  id: number;
  isPaid: boolean;
  // classId: [number];
}

export interface teacher {
  user: user;
  id: number;
  wage: number;
  subWage: number;
  workTime: number;
  classId: [number];
}
