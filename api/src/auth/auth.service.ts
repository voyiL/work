import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './auth.constant';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }
    async validateUser(email: string, password: string): Promise<any> {
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
        // const tokens = this.getTokens(user.id, user.email)
        const refresh_token = this.jwtService.sign(payload);
        await this.userService.update(payload.sub, { refreshToken: refresh_token });
        return {
            access_token: this.jwtService.sign(payload),
            // tokens
        }
    }
    async logout(userId: number) {
        await this.userService.update(userId, { refreshToken: null });
    }
    // async getTokens(userId: number, username: string) {
    //     const [accessToken, refreshToken] = await Promise.all([
    //         this.jwtService.signAsync(
    //             {
    //                 sub: userId,
    //                 username,
    //             },
    //             {
    //                 secret: this.configService.get<string>('JWT_ACCESS_TOKEN'),
    //                 expiresIn: '15m',
    //             },
    //         ),
    //         this.jwtService.signAsync(
    //             {
    //                 sub: userId,
    //                 username,
    //             },
    //             {
    //                 secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
    //                 expiresIn: '7d',
    //             },
    //         ),
    //     ]);

    //     return {
    //         accessToken,
    //         refreshToken,
    //     };
    // }

    // async getTokens(user: UserDto) {
    //     const payload = { email: user.email, sub: user.id }
    //     return {
    //         access_token: "user.email",
    //         refresh_token: this.jwtService.sign(payload),
    //     };
    // }

    async refreshTokens(email: string, exAccess_token: string) {
        let access_token = '';
        let refresh_token = '';
        const user = await this.userService.findByEmail(email);
        if (!user || !user.refreshToken) {
            throw new ForbiddenException('Access Denied');
        }
        else if (user.refreshToken === exAccess_token) {
            const payload = { email: user.email, sub: user.id }
            access_token = this.jwtService.sign(payload);
            refresh_token = this.jwtService.sign(payload);
        }
        else {
            throw new ForbiddenException('Access Denied');
        }
        await this.userService.update(user.id, { refreshToken: refresh_token })
        return access_token;
    }
}
