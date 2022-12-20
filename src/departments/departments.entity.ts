import { Faculty } from 'src/faculties/faculties.entity';
import { Institute } from 'src/institutes/institutes.entity';
import { Entity, Column, ObjectIdColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

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

}
