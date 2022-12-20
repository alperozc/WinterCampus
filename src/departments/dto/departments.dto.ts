import { IsNotEmpty, MinLength } from "class-validator";
import { Department } from "../departments.entity";
import { Faculty } from "src/faculties/faculties.entity";
import { Institute } from "src/institutes/institutes.entity";

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
}

export class UpdateDepartmentDTO extends CreateDepartmentDTO {
}


export class DepartmentDTO {
    static toJson(Department: Department): GetDepartmentDTO {
        return {
            id: Department.id,
            name: Department.name,
            faculty: Department.faculty,
            institute: Department.institute
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
