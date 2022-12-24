import { Faculty } from 'src/faculties/faculties.entity';
import { Institute } from 'src/institutes/institutes.entity';
import { Lesson } from 'src/lessons/lessons.entity';
import { Student } from 'src/students/students.entity';
import { Teacher } from 'src/teachers/teachers.entity';
import { Entity, Column, ObjectIdColumn, ManyToOne, JoinColumn, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Department {
    /* @ObjectIdColumn()
    id: string; */

    @PrimaryColumn({ unique: true, type: 'int', generated: 'identity' })
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Faculty, (faculty: Faculty) => faculty.departments, { onDelete: 'CASCADE' })
    @JoinColumn()
    faculty: Faculty;

    @ManyToOne(() => Institute, (institute: Institute) => institute.departments, { onDelete: 'CASCADE' })
    @JoinColumn()
    institute: Institute;

    @ManyToMany(() => Lesson, (lesson: Lesson) => lesson.departments, { cascade: true })
    @JoinTable()
    lessons: Lesson[];

    @OneToMany(() => Student, (student: Student) => student.department, { onDelete: 'CASCADE' })
    @JoinColumn()
    students: Student[];

    @ManyToMany(() => Teacher, (teacher: Teacher) => teacher.departments, { cascade: true })
    @JoinTable()
    teachers: Teacher[];

}
