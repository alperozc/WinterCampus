import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { CreateFacultyDTO } from './dto/faculties.dto';

@Controller('faculties')
export class FacultiesController {

    constructor(private facultyService: FacultiesService) { }

    @Get()
    getFaculties() {
        return this.facultyService.getFaculties()
    }

    @Get(':id')
    getFaculty(@Param('id') id: number) {
        return this.facultyService.getFaculty(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createFaculty(@Body() facultyDTO: CreateFacultyDTO) {
        return this.facultyService.createFaculty(facultyDTO)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateFaculty(@Param('id') id: number, @Body() facultyDTO: CreateFacultyDTO) {
        return this.facultyService.updateFaculty(id, facultyDTO)
    }

    @Delete(':id')
    deleteFaculty(@Param('id') id: number) {
        return this.facultyService.deleteFaculty(id).then(() => 'Faculty deleted')
    }
}
