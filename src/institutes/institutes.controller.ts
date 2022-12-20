import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { InstitutesService } from './institutes.service';
import { CreateInstituteDTO } from './dto/institutes.dto';

@Controller('institutes')
export class InstitutesController {
    constructor(private instituteService: InstitutesService) { }

    @Get()
    getInstitutes() {
        return this.instituteService.getInstitutes()
    }

    @Get(':id')
    getInstitute(@Param('id') id: number) {
        return this.instituteService.getInstitute(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createInstitute(@Body() instituteDTO: CreateInstituteDTO) {
        return this.instituteService.createInstitute(instituteDTO)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateInstitute(@Param('id') id: number, @Body() instituteDTO: CreateInstituteDTO) {
        return this.instituteService.updateInstitute(id, instituteDTO)
    }

    @Delete(':id')
    deleteInstitute(@Param('id') id: number) {
        return this.instituteService.deleteInstitute(id).then(() => 'Institute deleted')
    }



}
