import { AuthService } from '../services/auth.service';
import { SigninDTO } from '../dto/signin.dto';
import { SignupDTO } from '../dto/signup.dto';
import { AuthToken } from '../interfaces/authtoken.interface';
import { User } from '../interfaces/user.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDTO: SignupDTO): Promise<User>;
    signin(signinDTO: SigninDTO): Promise<AuthToken>;
}
