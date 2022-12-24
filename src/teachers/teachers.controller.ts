import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDTO, UpdateTeacherDTO } from './dto/teachers.dto';

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

    @Post()
    @UsePipes(ValidationPipe)
    createTeacher(@Body() teacherDTO: CreateTeacherDTO) {
        return this.teacherService.createTeacher(teacherDTO)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateTeacher(@Param('id') id: number, @Body() teacherDTO: UpdateTeacherDTO) {
        return this.teacherService.updateTeacher(id, teacherDTO)
    }

    @Delete(':id')
    deleteTeacher(@Param('id') id: number) {
        return this.teacherService.deleteTeacher(id).then(() => 'Teacher deleted')
    }

}
