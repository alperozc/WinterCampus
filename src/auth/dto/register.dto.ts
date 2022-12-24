import { IsNotEmpty, MinLength } from "class-validator";

export class RegisterDTO {
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