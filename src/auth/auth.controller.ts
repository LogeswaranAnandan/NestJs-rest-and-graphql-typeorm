import { Body, Controller, Post } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthModel } from './models/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authModel: AuthModel): Promise<User> {
    return await this._authService.signUp(authModel);
  }

  @Post('/signin')
  async signIn(@Body() authModel: AuthModel): Promise<{ jwtToken: string }> {
    return await this._authService.signIn(authModel);
  }
}
