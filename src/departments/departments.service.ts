import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Department } from './departments.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDTO, DepartmentDTO } from './dto/departments.dto';

@Injectable()
export class DepartmentsService {

    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>
    ) { }

    async getDepartments() {
        const departments = await this.departmentRepository.find({ relations: ['faculty'] })
        return DepartmentDTO.toJsonMap(departments)
    }

    async getDepartment(id: number) {
        const department = await this.departmentRepository.findOne({ where: { id }, relations: ['faculty'] }).catch(() => null)
        if (!department) throw new NotFoundException('Department not found')
        return DepartmentDTO.toJson(department)
    }

    async createDepartment(departmentDTO: CreateDepartmentDTO) {
        const faculty = await this.departmentRepository.manager.findOne('faculty', { where: { id: departmentDTO.faculty } }).catch(() => null)
        if (!faculty) throw new NotFoundException('Faculty not found')

        const institute = await this.departmentRepository.manager.findOne('institute', { where: { id: departmentDTO.institute } }).catch(() => null)
        if (!institute) throw new NotFoundException('Institute not found')

        const department = this.departmentRepository.create(departmentDTO)

        return this.departmentRepository.save(department).catch(err => {
            if (err.code === 11000)
                throw new ConflictException('Department already exists')
            throw err
        })
    }

    async updateDepartment(id: number, departmentDTO: CreateDepartmentDTO) {
        const department = await this.departmentRepository.findOneBy({ id }).catch(() => null)
        if (!department) throw new NotFoundException('Department not found')
        this.departmentRepository.merge(department, DepartmentDTO.toUpdateJson(departmentDTO))
        const saved = await this.departmentRepository.save(department)
        return DepartmentDTO.toJson(saved)
    }

    async deleteDepartment(id: number) {
        const department = await this.departmentRepository.findOneBy({ id }).catch(() => null)
        if (!department) throw new NotFoundException('Department not found')
        return this.departmentRepository.delete(id)
    }
}
