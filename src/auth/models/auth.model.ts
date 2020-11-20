import { Matches, MaxLength, MinLength } from 'class-validator';

export class AuthModel {
  @MinLength(6)
  @MaxLength(15)
  username: string;

  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,15}$/, {
    message: 'ERR_PASSWORD_TOO_WEAK',
  })
  password: string;
}
