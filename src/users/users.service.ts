import { ConflictException, Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private _userRepository: UserRepository) {}

  async getUserById(id: number): Promise<User> {
    return await this._userRepository.findOne(id);
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this._userRepository.findOne({
      username,
    });
  }

  async createUser(user: User): Promise<User> {
    const existingUser: User = await this.getUserByUsername(user.username);

    if (existingUser == null) {
      return await this._userRepository.save(user);
    } else {
      throw new ConflictException('Username already exists');
    }
  }
}
