import { Role } from "src/roles/roles.entity";
import { Student } from "src/students/students.entity";
import { Teacher } from "src/teachers/teachers.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn({ unique: true, type: 'int', generated: true })
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @OneToMany(() => Student, (student: Student) => student.user, { cascade: true })
    students: Student[];

    @OneToOne(() => Teacher, (teacher: Teacher) => teacher.user, { onDelete: 'CASCADE' })
    @JoinColumn()
    teacher: Teacher;

    @ManyToMany(() => Role, (role: Role) => role.users, { cascade: true })
    @JoinColumn()
    roles: Role[];

}