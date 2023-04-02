import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SigninDTO } from '../dto/signin.dto';
import { SignupDTO } from '../dto/signup.dto';
import { AuthToken } from '../interfaces/authtoken.interface';
import { User } from '../interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO): Promise<User> {
    return this.authService.signup(signupDTO);
  }

  @Post('signin')
  async signin(@Body() signinDTO: SigninDTO): Promise<AuthToken> {
    return this.authService.signin(signinDTO);
  }
}
