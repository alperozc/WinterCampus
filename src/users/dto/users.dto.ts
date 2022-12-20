import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { User } from "../users.entity";

export class CreateUserDTO {
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty() @IsEmail()
    email: string;
}

export class GetUserDTO {
    id: number;
    username: string;
    email: string;
}

export class UpdateUserDTO extends CreateUserDTO {
}


export class UserDTO {
    static toJson(user: User): GetUserDTO {
        return {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }

    static toJsonMap(users: User[]): GetUserDTO[] {
        return users.map(user => this.toJson(user));
    }


    static toUpdateJson(user: UpdateUserDTO) {
        return {
            username: user.username,
            password: user.password,
            email: user.email,
        }
    }

}
