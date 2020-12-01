import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';

import { AuthService } from './auth.service';
import { AuthModel } from './models/auth.model';

@Resolver()
export class AuthResolver {
  constructor(private _authService: AuthService) {}

  @Mutation('signUp')
  async signUp(@Args('authModel') authModel: AuthModel): Promise<User> {
    return await this._authService.signUp(authModel);
  }

  @Mutation('signIn')
  async signIn(
    @Args('authModel') authModel: AuthModel,
  ): Promise<{ jwtToken: string }> {
    return await this._authService.signIn(authModel);
  }
}
