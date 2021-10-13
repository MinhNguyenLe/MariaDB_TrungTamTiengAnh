import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
