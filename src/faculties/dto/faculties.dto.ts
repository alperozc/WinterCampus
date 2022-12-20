import { IsNotEmpty, MinLength } from "class-validator";
import { Faculty } from "../faculties.entity";
import { Department } from "src/departments/departments.entity";

export class CreateFacultyDTO {
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}

export class GetFacultyDTO {
    _id: string;
    name: string;
    departments: Department[];
}

export class UpdateFacultyDTO extends CreateFacultyDTO {
}


export class FacultyDTO {
    static toJson(faculty: Faculty): GetFacultyDTO {
        return {
            _id: faculty._id,
            name: faculty.name,
            departments: faculty.departments
        }
    }

    static toJsonMap(faculty: Faculty[]): GetFacultyDTO[] {
        return faculty.map(user => this.toJson(user));
    }


    static toUpdateJson(faculty: UpdateFacultyDTO) {
        return {
            name: faculty.name
        }
    }

}
