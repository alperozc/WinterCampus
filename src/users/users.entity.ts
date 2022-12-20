import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

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

    @Column({ unique: true })
    email: string;

}