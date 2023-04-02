import { SigninDTO } from '../dto/signin.dto';
import { SignupDTO } from '../dto/signup.dto';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { AuthToken } from '../interfaces/authtoken.interface';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UserService);
    signup(signupDTO: SignupDTO): Promise<User>;
    signin(signinDTO: SigninDTO): Promise<AuthToken>;
    private generateToken;
    validateUser(username: string): Promise<User>;
}
