import { Exclude } from "class-transformer";
import { Role } from "src/role/entity/role.entity";
import { UserRole } from "src/user-role/entity/user-role.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Exclude()
    @CreateDateColumn()
    created_at: Date;
    @Exclude()
    @UpdateDateColumn()
    updated_at: Date;
    @Exclude()
    @Column({ type: String, unique: true, nullable: true })
    refreshToken: string;
    @OneToMany(() => Role, role => role.users)
    roles: Role[];

    // @OneToMany(() => UserRole, role => role.users)
    // roles: UserRole[];

    // @ManyToMany(() => Role, role => role.users)
    // @JoinTable({ name: 'user_role' })
}