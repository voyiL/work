import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('/add')
    createUser(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.userService.update(id, user);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findById(id);
    }
    @Get(':email')
    getUserByEmail(email: string) {
        return this.userService.findByEmail(email);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }
}
