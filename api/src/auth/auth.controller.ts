import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req: any) {
        return await this.authService.login(req.user)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/logout')
    async logout(@Request() req: any) {
        return await this.authService.logout(req.user['id']);
    }
    @UseGuards(AuthGuard('jwt-refresh'))
    @Get('/refresh')
    async refresh(@Request() req: any) {
        const email = req.user['id'];
        const token = req.get('Authorization').replace('Bearer ', '').trim();
        return console.log(email);
        
        // return await this.authService.logout(req.user['id']);
    }
}
