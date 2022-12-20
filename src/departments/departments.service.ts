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
        return this.departmentRepository.find({ relations: ['faculty'] })
        const departments = await this.departmentRepository.find()
        return DepartmentDTO.toJsonMap(departments)
    }

    async getDepartment(id: string) {
        return this.departmentRepository.findOne(id as any).catch(() => null)
        const department = await this.departmentRepository.findOne(id as any).catch(() => null)
        if (!department) throw new NotFoundException('Department not found')
        return DepartmentDTO.toJson(department)
    }

    async createDepartment(departmentDTO: CreateDepartmentDTO) {
        const department = this.departmentRepository.create(departmentDTO)

        return this.departmentRepository.save(department).catch(err => {
            if (err.code === 11000)
                throw new ConflictException('Department already exists')
        })
    }

    async updateDepartment(id: string, departmentDTO: CreateDepartmentDTO) {
        const department = await this.departmentRepository.findOne(id as any).catch(() => null)
        if (!department) throw new NotFoundException('Department not found')
        this.departmentRepository.merge(department, DepartmentDTO.toUpdateJson(departmentDTO))
        const saved = await this.departmentRepository.save(department)
        return DepartmentDTO.toJson(saved)
    }

    async deleteDepartment(id: string) {
        const department = await this.departmentRepository.findOne(id as any).catch(() => null)
        if (!department) throw new NotFoundException('Department not found')
        return this.departmentRepository.delete(id as any)
    }
}
