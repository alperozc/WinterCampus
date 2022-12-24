import { Department } from "src/departments/departments.entity";
import { Student } from "src/students/students.entity";
import { Teacher } from "src/teachers/teachers.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Lesson {

    @PrimaryColumn({ unique: true, type: 'int', generated: 'identity' })
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Department, (department: Department) => department.lessons, { onDelete: 'CASCADE' })
    @JoinColumn()
    departments: Department[];

    @Column({ nullable: false, default: 1, type: 'int' })
    year: number;

    @Column({ nullable: false, default: 1, type: 'int' })
    semester: number;

    @ManyToMany(() => Student, (student: Student) => student.lessons, { onDelete: 'CASCADE' })
    @JoinTable()
    students: Student[];

    @ManyToOne(() => Teacher, (teacher: Teacher) => teacher.lessons, { onDelete: 'CASCADE' })
    @JoinColumn()
    teacher: Teacher;
}