import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class UserDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @IsString()
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}