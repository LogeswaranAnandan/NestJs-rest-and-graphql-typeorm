import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  async test(@CurrentUser() user: User) {
    console.log(user);
    return 'Inside test';
  }
}
