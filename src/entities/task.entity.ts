import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TaskStatus } from '../tasks/models/task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  constructor(title: string, description: string, status?: TaskStatus) {
    this.title = title;
    this.description = description;
    this.status = status || TaskStatus.OPEN;
  }
}
