import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Faculty } from './faculties.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacultyDTO, FacultyDTO, UpdateFacultyDTO } from './dto/faculties.dto';

@Injectable()
export class FacultiesService {

    constructor(
        @InjectRepository(Faculty)
        private facultyRepository: Repository<Faculty>
    ) { }

    async getFaculties() {
        const faculties = await this.facultyRepository.find()
        return FacultyDTO.toJsonMap(faculties)
    }

    async getFaculty(id: string) {
        const faculty = await this.facultyRepository.findOne(id as any).catch(() => null)
        if (!faculty) throw new NotFoundException('Faculty not found')
        return FacultyDTO.toJson(faculty)
    }

    async createFaculty(facultyDTO: CreateFacultyDTO) {
        const faculty = this.facultyRepository.create(facultyDTO)

        return this.facultyRepository.save(faculty).catch(err => {
            if (err.code === 11000)
                throw new ConflictException('Faculty already exists')
        });
    }

    async updateFaculty(id: string, facultyDTO: UpdateFacultyDTO) {
        const faculty = await this.facultyRepository.findOne(id as any).catch(() => null)
        if (!faculty) throw new NotFoundException('Faculty not found')
        this.facultyRepository.merge(faculty, FacultyDTO.toUpdateJson(facultyDTO))
        const saved = await this.facultyRepository.save(faculty)
        return FacultyDTO.toJson(saved)
    }

    async deleteFaculty(id: string) {
        const faculty = await this.facultyRepository.findOne(id as any).catch(() => null)
        if (!faculty) throw new NotFoundException('Faculty not found')
        return this.facultyRepository.delete(id as any)
    }

}
