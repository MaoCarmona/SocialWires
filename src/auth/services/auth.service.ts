import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDTO } from '../dto/signin.dto';
import { SignupDTO } from '../dto/signup.dto';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthToken } from '../interfaces/authtoken.interface';
import {uuid} from 'uuid'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async signup(signupDTO: SignupDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(signupDTO.password, 10);

    const user = await this.usersService.create({
        id: uuid,
        username: signupDTO.username,
        email: signupDTO.email,
        password: hashedPassword,
        fullname: signupDTO.fullname,
        createdAt: new Date(),
        messages :[],
    });

    return user;
  }

  async signin(signinDTO: SigninDTO): Promise<AuthToken> {
    const user = await this.usersService.findByUsername(signinDTO.username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordIsValid = await bcrypt.compare(
      signinDTO.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);

    return {
      accessToken: token,
      expiresIn: '1d',
      message: 'Successfully logged in',
      status: true,
    };
  }

  private generateToken(user: User): string {
    const payload = { username: user.username, userId: user.id };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  }
  async validateUser(username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);

    if (user != null) {
      return user;
    }

    return null;
  }
}

