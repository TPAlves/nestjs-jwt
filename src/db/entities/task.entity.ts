import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  // Opcional
  id?: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamptz', name: 'updated_date' })
  updatedDate: Date;

  @Column({ type: 'timestamptz', name: 'expiration_date' })
  expirationDate: Date;
}
