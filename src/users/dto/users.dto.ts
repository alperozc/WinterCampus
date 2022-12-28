import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";
import { User } from "../users.entity";
import { Role } from "src/roles/roles.entity";
import { Student } from "src/students/students.entity";
import { Teacher } from "src/teachers/teachers.entity";

export class CreateUserDTO {
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;
}

export class GetUserDTO {
    id: number;
    username: string;
    name: string;
    surname: string;
    roles: Role[];
    students: Student[];
}

export class UpdateUserDTO {
    @MinLength(3)
    username: string;
    name: string;
    surname: string;
    @MinLength(6)
    password: string;
}


export class UserDTO {
    static toJson(user: User): GetUserDTO {
        return {
            id: user.id,
            username: user.username,
            name: user.name,
            surname: user.surname,
            roles: user.roles,
            students: user.students
        }
    }

    static toJsonMap(users: User[]): GetUserDTO[] {
        return users.map(user => this.toJson(user));
    }


    static toUpdateJson(user: UpdateUserDTO) {
        return {
            username: user.username,
            password: user.password,
            name: user.name,
            surname: user.surname,
        }
    }

}
