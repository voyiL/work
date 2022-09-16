import { IsNumber } from "class-validator";


export class UserRoleDto {
    @IsNumber()
    userId: number;
    @IsNumber()
    roleId: number = 2;
}