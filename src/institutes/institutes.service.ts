import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institute } from './institutes.entity';
import { Repository } from 'typeorm';
import { CreateInstituteDTO, UpdateInstituteDTO, InstituteDTO } from './dto/institutes.dto';

@Injectable()
export class InstitutesService {

    constructor(
        @InjectRepository(Institute)
        private instituteRepository: Repository<Institute>
    ) { }

    async getInstitutes() {
        const institutes = await this.instituteRepository.find({ relations: ['departments'] })
        return InstituteDTO.toJsonMap(institutes)
    }

    async getInstitute(id: number) {
        const institute = await this.instituteRepository.findOne({ where: { id: id }, relations: ['departments'] }).catch(() => null)
        if (!institute) throw new NotFoundException('Institute not found')
        return InstituteDTO.toJson(institute)
    }

    async createInstitute(instituteDTO: CreateInstituteDTO) {
        const institute = this.instituteRepository.create(instituteDTO)

        return this.instituteRepository.save(institute).catch(err => {
            if (err.code === 11000)
                throw new ConflictException('Institute already exists')
        });
    }

    async updateInstitute(id: number, instituteDTO: UpdateInstituteDTO) {
        const institute = await this.instituteRepository.findOneBy({ id }).catch(() => null)
        if (!institute) throw new NotFoundException('Institute not found')
        this.instituteRepository.merge(institute, InstituteDTO.toUpdateJson(instituteDTO))
        const saved = await this.instituteRepository.save(institute)
        return InstituteDTO.toJson(saved)
    }

    async deleteInstitute(id: number) {
        const institute = await this.instituteRepository.findOneBy({ id }).catch(() => null)
        if (!institute) throw new NotFoundException('Institute not found')
        return this.instituteRepository.delete(id)
    }
}
