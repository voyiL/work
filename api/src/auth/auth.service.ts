import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }
    async validateUser(email, password): Promise<any> {
        const user = await this.userService.findByEmail(email)
        if (user && user.password === password) {
            const { password, ...result } = user
            return result;
        }
        else {
            return null
        }
    }
    async login(user: UserDto) {
        const payload = { email: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
