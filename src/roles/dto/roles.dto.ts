import { IsNotEmpty } from "class-validator";
import { Role } from "../roles.entity";

export class CreateRoleDTO {
    @IsNotEmpty()
    name: string;
}

export class GetRoleDTO {
    id: number;
    name: string;
}

export class UpdateRoleDTO extends CreateRoleDTO {
}

export class RoleDTO {
    static toJson(role: Role): GetRoleDTO {
        return {
            id: role.id,
            name: role.name
        }
    }

    static toJsonMap(role: Role[]): GetRoleDTO[] {
        return role.map(t => this.toJson(t));
    }

    static toUpdateJson(role: UpdateRoleDTO) {
        return {
            name: role.name
        }
    }
}