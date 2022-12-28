import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDTO, UpdateTeacherDTO } from './dto/teachers.dto';
import { hasRoles } from 'src/roles/roles.decorator';
import JwtGuard from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('teachers')
export class TeachersController {
    constructor(private teacherService: TeachersService) { }

    @Get()
    getTeachers() {
        return this.teacherService.getTeachers()
    }

    @Get(':id')
    getTeacher(@Param('id') id: number) {
        return this.teacherService.getTeacher(id)
    }

    @hasRoles('SYSTEM_ADMIN', 'HUMAN_RESOURCES')
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UsePipes(ValidationPipe)
    createTeacher(@Body() teacherDTO: CreateTeacherDTO) {
        return this.teacherService.createTeacher(teacherDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'HUMAN_RESOURCES')
    @UseGuards(JwtGuard, RolesGuard)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateTeacher(@Param('id') id: number, @Body() teacherDTO: UpdateTeacherDTO) {
        return this.teacherService.updateTeacher(id, teacherDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'HUMAN_RESOURCES')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteTeacher(@Param('id') id: number) {
        return this.teacherService.deleteTeacher(id).then(() => 'Teacher deleted')
    }

}
