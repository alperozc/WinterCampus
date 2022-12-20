import { Department } from "src/departments/departments.entity";
import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Institute {
    /* @ObjectIdColumn()
    _id: string; */

    @PrimaryColumn({ unique: true, type: 'int', generated: 'identity' })
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Department, (department: Department) => department.institute, { cascade: true })
    departments: Department[];
}