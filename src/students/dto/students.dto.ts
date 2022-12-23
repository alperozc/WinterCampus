import { IsNotEmpty, MinLength } from "class-validator";
import { Department } from "src/departments/departments.entity";
import { Student } from "../students.entity";
import { User } from "src/users/users.entity";
import { Lesson } from "src/lessons/lessons.entity";

export class CreateStudentDTO {
    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    department: Department;

    year: number;
    semester: number;
    lessons: Lesson[];

}

export class GetStudentDTO {
    id: number;
    name: string;
    department: Department;
    year: number;
    semester: number;
    lessons: Lesson[];
}

export class UpdateStudentDTO /*extends CreateStudentDTO*/ {

    department: Department;
    year: number;
    semester: number;
    lessons: Lesson[];
}


export class StudentDTO {
    static toJson(student: Student): GetStudentDTO {
        return {
            id: student.id,
            name: `${student.user?.name ?? null} ${student.user?.surname ?? null}`,
            department: student.department,
            year: student.year,
            semester: student.semester,
            lessons: student.lessons
        }
    }

    static toJsonMap(student: Student[]): GetStudentDTO[] {
        return student.map(user => this.toJson(user));
    }


    static toUpdateJson(student: UpdateStudentDTO) {
        return {
            year: student.year,
            semester: student.semester,
            lessons: student.lessons
        }
    }

}
