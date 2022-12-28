import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDTO, UpdateLessonDTO } from './dto/lessons.dto';
import { hasRoles } from 'src/roles/roles.decorator';
import JwtGuard from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('lessons')
export class LessonsController {
    constructor(private lessonsService: LessonsService) { }

    @Get()
    getLessons() {
        return this.lessonsService.getLessons();
    }

    @Get(':id')
    getLesson(id: number) {
        return this.lessonsService.getLesson(id);
    }

    @hasRoles('SYSTEM_ADMIN', 'STUDENT_AFFAIRS', 'FACULTY_ADMIN', 'INSTITUTE_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UsePipes(ValidationPipe)
    createLesson(@Body() lessonDTO: CreateLessonDTO) {
        return this.lessonsService.createLesson(lessonDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'STUDENT_AFFAIRS', 'FACULTY_ADMIN', 'INSTITUTE_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateLesson(@Param('id') id: number, @Body() lessonDTO: UpdateLessonDTO) {
        return this.lessonsService.updateLesson(id, lessonDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'STUDENT_AFFAIRS', 'FACULTY_ADMIN', 'INSTITUTE_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteLesson(@Param('id') id: number) {
        return this.lessonsService.deleteLesson(id).then(() => 'Lesson deleted')
    }


}
