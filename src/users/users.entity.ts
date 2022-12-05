import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    _id: string;

    /* @PrimaryColumn({ default: true, unique: true })
    id = 0;
 */
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

}