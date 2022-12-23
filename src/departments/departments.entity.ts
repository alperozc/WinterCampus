import { Faculty } from 'src/faculties/faculties.entity';
import { Institute } from 'src/institutes/institutes.entity';
import { Lesson } from 'src/lessons/lessons.entity';
import { Student } from 'src/students/students.entity';
import { Entity, Column, ObjectIdColumn, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';

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

    @ManyToOne(() => Lesson, (lesson: Lesson) => lesson.departments, { onDelete: 'CASCADE' })
    @JoinColumn()
    lessons: Lesson[];

    @OneToMany(() => Student, (student: Student) => student.department, { onDelete: 'CASCADE' })
    @JoinColumn()
    students: Student[];

}
