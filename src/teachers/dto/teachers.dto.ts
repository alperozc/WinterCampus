import { IsNotEmpty, MinLength } from "class-validator";
import { Department } from "src/departments/departments.entity";
import { Teacher } from "../teachers.entity";
import { User } from "src/users/users.entity";
import { Lesson } from "src/lessons/lessons.entity";

export class CreateTeacherDTO {
    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    departments: Department[];

    lessons: Lesson[];

}

export class GetTeacherDTO {
    id: number;
    name: string;
    user: User;
    departments: Department[];
    lessons: Lesson[];
}

export class UpdateTeacherDTO /*extends CreateTeacherDTO*/ {

    departments: Department[];
    lessons: Lesson[];
}


export class TeacherDTO {
    static toJson(teacher: Teacher): GetTeacherDTO {
        return {
            id: teacher.id,
            user: teacher.user,
            name: `${teacher.user?.name} ${teacher.user?.surname}`,
            departments: teacher.departments,
            lessons: teacher.lessons
        }
    }

    static toJsonMap(teacher: Teacher[]): GetTeacherDTO[] {
        return teacher.map(t => this.toJson(t));
    }


    static toUpdateJson(teacher: UpdateTeacherDTO) {
        return {
            departments: teacher.departments,
            lessons: teacher.lessons
        }
    }

}
