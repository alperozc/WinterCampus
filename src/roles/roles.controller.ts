import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDTO, UpdateRoleDTO } from './dto/roles.dto';
import { hasRoles } from './roles.decorator';
import JwtGuard from 'src/auth/jwt.guard';
import { RolesGuard } from './roles.guard';

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

    @hasRoles('SYSTEM_ADMIN', 'HUMAN_RESOURCES')
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UsePipes(ValidationPipe)
    createRole(@Body() roleDTO: CreateRoleDTO) {
        return this.rolesService.createRole(roleDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'HUMAN_RESOURCES')
    @UseGuards(JwtGuard, RolesGuard)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateRole(@Body() roleDTO: UpdateRoleDTO, @Param('id') id: number) {
        return this.rolesService.updateRole(id, roleDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'HUMAN_RESOURCES')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteRole(@Param('id') id: number) {
        return this.rolesService.deleteRole(id).then(() => 'Role deleted')
    }


}
