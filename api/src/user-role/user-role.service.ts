import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRole } from './entity/user-role.entity';

@Injectable()
export class UserRoleService {
    constructor(@InjectRepository(UserRole) private userRoleRepo: Repository<UserRole>) { }
    async create(userRole: CreateUserRoleDto) {
        const dto = Object.assign(new UserRole, CreateUserRoleDto);
        console.log(userRole);
        try {
            return await this.userRoleRepo.save(userRole);
        } catch (error) {
           console.log(error);
            
        }
    }
}
