import { role } from './role.interface';

export interface user {
  id: number;
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  placeBirth: string;
  gender: number;
  address: string;
  role: role;
}
