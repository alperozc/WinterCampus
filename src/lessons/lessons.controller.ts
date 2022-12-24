import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDTO, UpdateLessonDTO } from './dto/lessons.dto';

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

    @Post()
    @UsePipes(ValidationPipe)
    createLesson(@Body() lessonDTO: CreateLessonDTO) {
        return this.lessonsService.createLesson(lessonDTO)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateLesson(@Param('id') id: number, @Body() lessonDTO: UpdateLessonDTO) {
        return this.lessonsService.updateLesson(id, lessonDTO)
    }

    @Delete(':id')
    deleteLesson(@Param('id') id: number) {
        return this.lessonsService.deleteLesson(id).then(() => 'Lesson deleted')
    }


}
