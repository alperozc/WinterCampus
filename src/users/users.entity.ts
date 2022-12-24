import { Student } from "src/students/students.entity";
import { Teacher } from "src/teachers/teachers.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, ObjectIdColumn, OneToMany, OneToOne, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class User {
    /* @ObjectIdColumn()
    _id: string; */

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

}