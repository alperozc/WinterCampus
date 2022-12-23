import { Student } from "src/students/students.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn, OneToMany, PrimaryColumn } from "typeorm";

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

}