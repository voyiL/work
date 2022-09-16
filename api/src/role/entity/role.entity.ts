import { UserRole } from "src/user-role/entity/user-role.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany(() => User, user => user.roles)
    users: User[]

    // @ManyToMany(() => User, user => user.roles)

    // @OneToMany(() => UserRole, role => role.roles)
    // users: UserRole[];
}