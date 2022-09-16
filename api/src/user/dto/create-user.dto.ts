import { PartialType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { UserDto } from "./user.dto";


export class CreateUserDto extends PartialType(UserDto) {
    @IsNumber()
    roleId: number;
}