import { PartialType } from "@nestjs/swagger";
import { UserRoleDto } from "./user-role.dto";


export class CreateUserRoleDto extends PartialType(UserRoleDto) { }