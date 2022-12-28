import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDTO, UpdateDepartmentDTO } from './dto/departments.dto';
import { hasRoles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import JwtGuard from 'src/auth/jwt.guard';

@Controller('departments')
export class DepartmentsController {
    constructor(private departmentService: DepartmentsService) { }

    @hasRoles('SYSTEM_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Get()
    getDepartments() {
        return this.departmentService.getDepartments()
    }

    @Get(':id')
    getDepartment(@Param('id') id: number) {
        return this.departmentService.getDepartment(id)
    }


    @hasRoles('SYSTEM_ADMIN', 'FACULTY_ADMIN', 'INSTITUTE_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UsePipes(ValidationPipe)
    createDepartment(@Body() departmentDTO: CreateDepartmentDTO) {
        return this.departmentService.createDepartment(departmentDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'FACULTY_ADMIN', 'INSTITUTE_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateDepartment(@Param('id') id: number, @Body() departmentDTO: UpdateDepartmentDTO) {
        return this.departmentService.updateDepartment(id, departmentDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'FACULTY_ADMIN', 'INSTITUTE_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteDepartment(@Param('id') id: number) {
        return this.departmentService.deleteDepartment(id).then(() => 'Department deleted')
    }

}
