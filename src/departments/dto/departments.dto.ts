import { IsNotEmpty, MinLength } from "class-validator";
import { Department } from "../departments.entity";
import { Faculty } from "src/faculties/faculties.entity";

export class CreateDepartmentDTO {
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    faculty: Faculty;
}

export class GetDepartmentDTO {
    _id: string;
    name: string;
    faculty: Faculty;
}

export class UpdateDepartmentDTO extends CreateDepartmentDTO {
}


export class DepartmentDTO {
    static toJson(Department: Department): GetDepartmentDTO {
        return {
            _id: Department._id,
            name: Department.name,
            faculty: Department.faculty
        }
    }

    static toJsonMap(Department: Department[]): GetDepartmentDTO[] {
        return Department.map(user => this.toJson(user));
    }


    static toUpdateJson(Department: UpdateDepartmentDTO) {
        return {
            name: Department.name,
            facultyId: Department.faculty
        }
    }

}
