import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDTO, UpdateStudentDTO } from './dto/students.dto';
import { hasRoles } from 'src/roles/roles.decorator';
import JwtGuard from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { GetLessonDTO } from 'src/lessons/dto/lessons.dto';
import { LessonsService } from 'src/lessons/lessons.service';
import { Req } from '@nestjs/common/decorators';

@Controller('students')
export class StudentsController {
    constructor(
        private studentService: StudentsService,
        private lessonService: LessonsService
    ) { }

    @Get()
    getStudents() {
        return this.studentService.getStudents()
    }

    @Get(':id')
    getStudent(@Param('id') id: number) {
        return this.studentService.getStudent(id)
    }

    @hasRoles('SYSTEM_ADMIN', 'STUDENT_AFFAIRS')
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UsePipes(ValidationPipe)
    createStudent(@Body() studentDTO: CreateStudentDTO) {
        return this.studentService.createStudent(studentDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'STUDENT_AFFAIRS')
    @UseGuards(JwtGuard, RolesGuard)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateStudent(@Param('id') id: number, @Body() studentDTO: UpdateStudentDTO) {
        return this.studentService.updateStudent(id, studentDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'STUDENT_AFFAIRS')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteStudent(@Param('id') id: number) {
        return this.studentService.deleteStudent(id).then(() => 'Student deleted')
    }


    // Lessons
    @hasRoles('SYSTEM_ADMIN', 'STUDENT_AFFAIRS')
    @UseGuards(JwtGuard, RolesGuard)
    @Post(':id/lessons')
    addLesson(@Param('id') id: number, @Body() lessonDTO: GetLessonDTO) {
        return this.lessonService.addStudentToLesson(id, lessonDTO?.id)
    }

    @hasRoles('SYSTEM_ADMIN', 'STUDENT_AFFAIRS')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id/lessons/:lesson_id')
    removeLesson(@Param('id') id: number, @Param('lesson_id') lesson_id: number) {
        return this.lessonService.removeStudentFromLesson(id, lesson_id)
    }

    // Self

    @UseGuards(JwtGuard)
    @Post('self/lessons')
    addLessonToSelf(@Req() req, @Body() lessonDTO: GetLessonDTO) {
        return this.lessonService.addLessonToSelf(req.user, lessonDTO?.id)
    }

    @UseGuards(JwtGuard)
    @Delete('self/lessons/:lesson_id')
    removeLessonFromSelf(@Req() req, @Param('lesson_id') lesson_id: number) {
        return this.lessonService.removeLessonFromSelf(req.user, lesson_id)
    }

}
