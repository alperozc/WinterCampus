import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDTO, UpdateDepartmentDTO } from './dto/departments.dto';

@Controller('departments')
export class DepartmentsController {
    constructor(private departmentService: DepartmentsService) { }

    @Get()
    getDepartments() {
        return this.departmentService.getDepartments()
    }

    @Get(':id')
    getDepartment(@Param('id') id: number) {
        return this.departmentService.getDepartment(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createDepartment(@Body() departmentDTO: CreateDepartmentDTO) {
        return this.departmentService.createDepartment(departmentDTO)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateDepartment(@Param('id') id: number, @Body() departmentDTO: UpdateDepartmentDTO) {
        return this.departmentService.updateDepartment(id, departmentDTO)
    }

    @Delete(':id')
    deleteDepartment(@Param('id') id: number) {
        return this.departmentService.deleteDepartment(id).then(() => 'Department deleted')
    }

}
