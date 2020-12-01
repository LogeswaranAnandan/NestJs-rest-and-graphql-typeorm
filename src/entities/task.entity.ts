import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { TaskStatus } from '../tasks/models/task-status.enum';
import { User } from './user.entity';

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  _userId: number;

  constructor(
    title?: string,
    description?: string,
    status?: TaskStatus,
    user?: User,
  ) {
    this.title = title;
    this.description = description;
    this.status = status || TaskStatus.OPEN;
    // this.user = user || new User();
  }
}
