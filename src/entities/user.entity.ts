import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from './task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => Task, (task) => task.user)
  tasks: Task[];

  constructor(username?: string, password?: string, salt?: string) {
    this.username = username;
    this.password = password;
    this.salt = salt;
  }
}
