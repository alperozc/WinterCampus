import { Department } from "src/departments/departments.entity";
import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";

@Entity()
export class Faculty {
    @ObjectIdColumn()
    _id: string;

    /* @PrimaryColumn({ default: true, unique: true })
    id = 0;
 */
    @Column({ unique: true })
    name: string;

    @OneToMany(() => Department, (department: Department) => department.faculty)
    departments: Department[];
}