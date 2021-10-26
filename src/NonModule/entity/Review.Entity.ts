import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: '' })
  note: string;

  @Column({ nullable: false })
  idStudent: number;

  @Column({ nullable: false })
  idClass: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
