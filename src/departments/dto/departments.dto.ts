import { IsNotEmpty, MinLength } from "class-validator";
import { Department } from "../departments.entity";
import { Faculty } from "src/faculties/faculties.entity";
import { Institute } from "src/institutes/institutes.entity";
import { Student } from "src/students/students.entity";
import { Teacher } from "src/teachers/teachers.entity";

export class CreateDepartmentDTO {
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    faculty: Faculty;
    institute: Institute;
}

export class GetDepartmentDTO {
    id: number;
    name: string;
    faculty: Faculty;
    institute: Institute;
    students: Student[];
    teachers: Teacher[];
}

export class UpdateDepartmentDTO extends CreateDepartmentDTO {
}


export class DepartmentDTO {
    static toJson(Department: Department): GetDepartmentDTO {
        return {
            id: Department.id,
            name: Department.name,
            faculty: Department.faculty,
            institute: Department.institute,
            students: Department.students,
            teachers: Department.teachers
        }
    }

    static toJsonMap(Department: Department[]): GetDepartmentDTO[] {
        return Department.map(user => this.toJson(user));
    }


    static toUpdateJson(Department: UpdateDepartmentDTO) {
        return {
            name: Department.name,
            faculty: Department.faculty,
            institute: Department.institute
        }
    }

}
