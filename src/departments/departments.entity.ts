import { Faculty } from 'src/faculties/faculties.entity';
import { Entity, Column, ObjectIdColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Department {
    @ObjectIdColumn()
    _id: string;

    @Column()
    name: string;

    @ManyToOne(() => Faculty, (faculty: Faculty) => faculty.departments, { nullable: false, cascade: true })
    @JoinColumn()
    faculty: Faculty;
}
