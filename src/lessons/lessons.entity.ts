import { Department } from "src/departments/departments.entity";
import { Student } from "src/students/students.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Lesson {

    @PrimaryColumn({ unique: true, type: 'int', generated: 'identity' })
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Department, (department: Department) => department.lessons, { cascade: true })
    departments: Department[];

    @Column({ nullable: false, default: 1, type: 'int' })
    year: number;

    @Column({ nullable: false, default: 1, type: 'int' })
    semester: number;

    @ManyToOne(() => Student, (student: Student) => student.lessons, { cascade: true })
    students: Student[];
}