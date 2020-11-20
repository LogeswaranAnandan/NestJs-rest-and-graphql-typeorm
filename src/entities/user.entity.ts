import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(username: string, password: string, salt: string) {
    this.username = username;
    this.password = password;
    this.salt = salt;
  }
}
