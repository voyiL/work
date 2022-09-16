import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entity/role.entity';
import { UserRoleDto } from 'src/user-role/dto/user-role.dto';
import { UserRoleService } from 'src/user-role/user-role.service';
import {  Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    logger: Logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private userRoleService: UserRoleService
    ) { }
    async create(user: CreateUserDto) {
        try { 
            await this.userRepo.save(user);
        } catch (error) {
            this.logger.error(error);
        }
        if (user) {
            try
            {
                const userRole = new UserRoleDto();
                userRole.userId = user.id;
                userRole.roleId = user.roleId;
                return await this.userRoleService.create(userRole)
            }
            catch (error) {
                this.logger.error(error);
            }
        }
    }
    async update(id: number, user: UpdateUserDto) {
        return await this.userRepo.update(id, user);
    }
    async delete(id: number) {
        return await this.userRepo.delete(id);
    }
    async findById(id: number): Promise<User> {
        return await this.userRepo.findOne({ where: { id } });
    }
    async findByEmail(email: string) {
        return await this.userRepo.findOne({ where: { email } });
    }
    async findAll(): Promise<User[]> {
        const qb = this.userRepo.createQueryBuilder('user');
        // qb.where('user');
        return await qb.execute();
        // return await this.userRepo.find({
        //     join: {
        //         alias: 'user',
        //         leftJoinAndSelect: {
        //             roles: 'user.roles'
        //         } 
        //     }
        // });
    }
}
