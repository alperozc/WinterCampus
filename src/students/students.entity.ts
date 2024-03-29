import { Department } from "src/departments/departments.entity";
import { Lesson } from "src/lessons/lessons.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryColumn({ unique: true, type: 'int', generated: 'identity' })
    id: number;

    @ManyToOne(() => User, (user: User) => user.students, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Department, (department: Department) => department.students)
    @JoinColumn()
    department: Department;

    @Column({ nullable: false, default: 1, type: 'int' })
    year: number;

    @Column({ nullable: false, default: 1, type: 'int' })
    semester: number;

    @ManyToMany(() => Lesson, (lesson: Lesson) => lesson.students, { onDelete: 'CASCADE' })
    lessons: Lesson[];

}