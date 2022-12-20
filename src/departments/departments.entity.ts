import { Faculty } from 'src/faculties/faculties.entity';
import { Entity, Column, ObjectIdColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Department {
    /* @ObjectIdColumn()
    id: string; */

    @PrimaryColumn({ unique: true, type: 'int', generated: 'identity' })
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Faculty, (faculty: Faculty) => faculty.departments, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn()
    faculty: Faculty;


}
