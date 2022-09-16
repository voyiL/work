import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entity/user-role.entity';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRoleService],
  exports: [UserRoleService]
})
export class UserRoleModule { }
