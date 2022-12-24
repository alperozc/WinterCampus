import { IsNotEmpty, Max, Min, MinLength } from "class-validator";
import { Department } from "src/departments/departments.entity";
import { Lesson } from "../lessons.entity";
import { Teacher } from "src/teachers/teachers.entity";
import { Student } from "src/students/students.entity";

export class CreateLessonDTO {
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    departments: Department[];

    @Min(1)
    @Max(8)
    @IsNotEmpty()
    year: number;

    @Min(1)
    @Max(2)
    @IsNotEmpty()
    semester: number;

    students: Student[];
    teacher: Teacher;
}

export class GetLessonDTO {
    id: number;
    name: string;
    departments: Department[];
    year: number;
    semester: number;
    teacher: Teacher;
    students: Student[];
}

export class UpdateLessonDTO extends CreateLessonDTO {
}


export class LessonDTO {
    static toJson(lesson: Lesson): GetLessonDTO {
        return {
            id: lesson.id,
            name: lesson.name,
            departments: lesson.departments,
            year: lesson.year,
            semester: lesson.semester,
            teacher: lesson.teacher,
            students: lesson.students
        }
    }

    static toJsonMap(lesson: Lesson[]): GetLessonDTO[] {
        return lesson.map(t => this.toJson(t));
    }


    static toUpdateJson(lesson: UpdateLessonDTO) {
        return {
            name: lesson.name,
            departments: lesson.departments,
            year: lesson.year,
            semester: lesson.semester,
            teacher: lesson.teacher,
            students: lesson.students
        }
    }

}
