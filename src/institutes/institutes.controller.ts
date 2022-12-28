import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InstitutesService } from './institutes.service';
import { CreateInstituteDTO, UpdateInstituteDTO } from './dto/institutes.dto';
import { hasRoles } from 'src/roles/roles.decorator';
import JwtGuard from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';

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


    @hasRoles('SYSTEM_ADMIN', 'INSTITUTE_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UsePipes(ValidationPipe)
    createInstitute(@Body() instituteDTO: CreateInstituteDTO) {
        return this.instituteService.createInstitute(instituteDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'INSTITUTE_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateInstitute(@Param('id') id: number, @Body() instituteDTO: UpdateInstituteDTO) {
        return this.instituteService.updateInstitute(id, instituteDTO)
    }

    @hasRoles('SYSTEM_ADMIN', 'INSTITUTE_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteInstitute(@Param('id') id: number) {
        return this.instituteService.deleteInstitute(id).then(() => 'Institute deleted')
    }



}
