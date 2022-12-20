import { IsNotEmpty, MinLength } from "class-validator";
import { Department } from "src/departments/departments.entity";
import { Institute } from "../institutes.entity";

export class CreateInstituteDTO {
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}

export class GetInstituteDTO {
    id: number;
    name: string;
    departments: Department[];
}

export class UpdateInstituteDTO extends CreateInstituteDTO {
}


export class InstituteDTO {
    static toJson(institute: Institute): GetInstituteDTO {
        return {
            id: institute.id,
            name: institute.name,
            departments: institute.departments
        }
    }

    static toJsonMap(institute: Institute[]): GetInstituteDTO[] {
        return institute.map(user => this.toJson(user));
    }


    static toUpdateJson(institute: UpdateInstituteDTO) {
        return {
            name: institute.name
        }
    }

}
