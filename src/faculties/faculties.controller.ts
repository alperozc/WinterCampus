import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { CreateFacultyDTO, UpdateFacultyDTO } from './dto/faculties.dto';
import { hasRoles } from 'src/roles/roles.decorator';
import JwtGuard from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';

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

    @hasRoles('SYSTEM_ADMIN', 'FACULTY_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UsePipes(ValidationPipe)
    createFaculty(@Body() facultyDTO: CreateFacultyDTO) {
        return this.facultyService.createFaculty(facultyDTO)
    }


    @hasRoles('SYSTEM_ADMIN', 'FACULTY_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateFaculty(@Param('id') id: number, @Body() facultyDTO: UpdateFacultyDTO) {
        return this.facultyService.updateFaculty(id, facultyDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'FACULTY_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteFaculty(@Param('id') id: number) {
        return this.facultyService.deleteFaculty(id).then(() => 'Faculty deleted')
    }
}
