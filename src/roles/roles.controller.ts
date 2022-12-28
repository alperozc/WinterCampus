import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDTO, UpdateRoleDTO } from './dto/roles.dto';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @Get()
    getRoles() {
        return this.rolesService.getRoles();
    }

    @Get(':id')
    getRole(@Param('id') id: number) {
        return this.rolesService.getRole(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRole(@Body() roleDTO: CreateRoleDTO) {
        return this.rolesService.createRole(roleDTO)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateRole(@Body() roleDTO: UpdateRoleDTO, @Param('id') id: number) {
        return this.rolesService.updateRole(id, roleDTO)
    }

    @Delete(':id')
    deleteRole(@Param('id') id: number) {
        return this.rolesService.deleteRole(id).then(() => 'Role deleted')
    }


}
