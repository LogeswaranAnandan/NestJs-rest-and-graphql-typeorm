import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  constructor(username?: string, password?: string, salt?: string) {
    this.username = username;
    this.password = password;
    this.salt = salt;
  }
}
