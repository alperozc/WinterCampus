import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryColumn({ unique: true, type: 'int', generated: 'identity' })
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => User, (user: User) => user.roles, { onDelete: 'CASCADE' })
    @JoinTable()
    users: User[];
}