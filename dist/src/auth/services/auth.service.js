"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signup(signupDTO) {
        const hashedPassword = await bcrypt.hash(signupDTO.password, 10);
        const user = await this.usersService.create({
            id: uuid_1.uuid,
            username: signupDTO.username,
            email: signupDTO.email,
            password: hashedPassword,
            fullname: signupDTO.fullname,
            createdAt: new Date(),
            messages: [],
        });
        return user;
    }
    async signin(signinDTO) {
        const user = await this.usersService.findByUsername(signinDTO.username);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordIsValid = await bcrypt.compare(signinDTO.password, user.password);
        if (!passwordIsValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.generateToken(user);
        return {
            accessToken: token,
            expiresIn: '1d',
            message: 'Successfully logged in',
            status: true,
        };
    }
    generateToken(user) {
        const payload = { username: user.username, userId: user.id };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
    async validateUser(username) {
        const user = await this.usersService.findByUsername(username);
        if (user != null) {
            return user;
        }
        return null;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map