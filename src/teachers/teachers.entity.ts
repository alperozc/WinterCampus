import { Department } from "src/departments/departments.entity";
import { Lesson } from "src/lessons/lessons.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class Teacher {

    @PrimaryColumn({ unique: true, type: 'int', generated: 'identity' })
    id: number;

    @OneToOne(() => User, (user: User) => user.teacher, { cascade: true })
    @JoinColumn()
    user: User;

    @ManyToMany(() => Department, (department: Department) => department.teachers, { onDelete: 'CASCADE' })
    departments: Department[];

    @OneToMany(() => Lesson, (lesson: Lesson) => lesson.teacher, { cascade: true })
    lessons: Lesson[];
}