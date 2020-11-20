import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';
import { MOCK_ENV } from '../mock.env';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: MOCK_ENV.secret,
    });
  }

  async validate({ sub, username }: JwtPayload) {
    const user = new User(username, null, null);
    user.id = sub;
    return user;
  }
}
