import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthModel } from './models/auth.model';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UsersService,
    private _jwtService: JwtService,
  ) {}

  async signUp({ username, password }: AuthModel): Promise<User> {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await this.hashPassword(password, salt);
    const user: User = new User(username, encryptedPassword, salt);
    const createdUser: User = await this._userService.createUser(user);

    delete createdUser.password;
    delete createdUser.salt;
    return createdUser;
  }

  async signIn({
    username,
    password,
  }: AuthModel): Promise<{ jwtToken: string }> {
    const currentUser: User = await this._userService.getUserByUsername(
      username,
    );

    if (currentUser && this.validatePassword(password, currentUser)) {
      const jwtToken: string = this.generateJwt(currentUser.id, username);
      return { jwtToken };
    } else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  private async validatePassword(password: string, user: User) {
    const inputPasswordHash: string = await this.hashPassword(
      password,
      user.salt,
    );
    return inputPasswordHash === user.password;
  }

  private generateJwt(userId: number, username: string): string {
    const payload: JwtPayload = {
      sub: userId,
      username,
    };
    return this._jwtService.sign(payload);
  }
}
