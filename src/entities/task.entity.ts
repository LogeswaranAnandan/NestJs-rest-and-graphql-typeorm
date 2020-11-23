import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TaskStatus } from '../tasks/models/task-status.enum';
import { User } from './user.entity';

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

  @ManyToOne((type) => User, (user) => user.tasks)
  user: User;

  constructor(
    title?: string,
    description?: string,
    status?: TaskStatus,
    user?: User,
  ) {
    this.title = title;
    this.description = description;
    this.status = status || TaskStatus.OPEN;
    this.user = user || new User();
  }
}
