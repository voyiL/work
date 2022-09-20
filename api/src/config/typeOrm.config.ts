import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Role } from "src/role/entity/role.entity";
import { UserRole } from "src/user-role/entity/user-role.entity";
import { User } from "src/user/entity/user.entity";

// export default class TypeOrmConfig {
//     static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
//         return {
//             type: configService.get('DB_TYPE'),
//             host: configService.get('DB_HOST'),
//             port: configService.get('DB_PORT'),
//             username: configService.get('DB_USERNAME'),
//             password: configService.get('DB_PASSWORD'),
//             database: configService.get('DB_DATABASE'),
//             entities: [Role, User, UserRole],
//             synchronize: true,
//         }
//     }
// }

// export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
//     useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
//         TypeOrmConfig.getOrmConfig(configService),
//     inject: [ConfigService]

// }