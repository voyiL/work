import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Role } from './role/entity/role.entity';
import { RoleModule } from './role/role.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserRole } from './user-role/entity/user-role.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { typeOrmConfigAsync } from './config/typeOrm.config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: ['.env.development.local', '.env.development']
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Password@1',
      database: 'wwldb',
      entities: [Role, User, UserRole],
      synchronize: true,
    }),
    RoleModule,
    UserModule,
    UserRoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
