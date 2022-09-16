import { Role } from "src/role/entity/role.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserRole {
    // @PrimaryGeneratedColumn()
    // id: number;

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    roleId: number;

    // @ManyToOne(() => User, user => user.roles)
    // users: User[];

    // @ManyToOne(() => Role, role => role.users)
    // roles: Role[];
}