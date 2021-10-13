import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  userName: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  placeBirth: string;

  @Column({ default: '' })
  dateBirth: string;

  @Column({ default: '' })
  phoneNumber: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: 0 }) // 0 : nu 1 : nam
  gender: number;

  @Column()
  roleId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

// @Entity('student_class')
// export class StudentEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   idUser: number;

//   @Column()
//   classId: [number];

//   @Column()
//   isPaid: boolean;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;
// }

// @Entity('teacher')
// export class TeacherEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   idUser: number;

//   @Column()
//   classId: [number];

//   @Column()
//   wage: number;

//   @Column()
//   workTime: number;

//   @Column()
//   subWage: number;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;
// }
