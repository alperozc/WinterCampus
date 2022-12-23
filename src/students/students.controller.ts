import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDTO } from './dto/students.dto';

@Controller('students')
export class StudentsController {
    constructor(private studentService: StudentsService) { }

    @Get()
    getStudents() {
        return this.studentService.getStudents()
    }

    @Get(':id')
    getStudent(@Param('id') id: number) {
        return this.studentService.getStudent(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createStudent(@Body() studentDTO: CreateStudentDTO) {
        return this.studentService.createStudent(studentDTO)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateStudent(@Param('id') id: number, @Body() studentDTO: CreateStudentDTO) {
        return this.studentService.updateStudent(id, studentDTO)
    }

    @Delete(':id')
    deleteStudent(@Param('id') id: number) {
        return this.studentService.deleteStudent(id).then(() => 'Student deleted')
    }
}
