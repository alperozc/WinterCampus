import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teachers.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDTO, TeacherDTO, UpdateTeacherDTO } from './dto/teachers.dto';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
    ) { }

    async getTeachers() {
        const teachers = await this.teacherRepository.find({ relations: ['departments', 'user', 'lessons'] });
        return TeacherDTO.toJsonMap(teachers);
    }

    async getTeacher(id: number) {
        const teacher = await this.teacherRepository.findOne({ where: { id: id }, relations: ['departments', 'user', 'lessons'] }).catch(() => null);
        if (!teacher) throw new NotFoundException('Teacher not found');
        return TeacherDTO.toJson(teacher);
    }

    async createTeacher(teacherDTO: CreateTeacherDTO) {
        // Check user exists
        const user = await this.teacherRepository.manager.findOne('user', { where: { id: teacherDTO.user } }).catch(() => null);
        if (!user) throw new NotFoundException('User not found');

        // Check user already exists in teachers table



        if (teacherDTO.departments) {
            if (!(teacherDTO.departments instanceof Array)) throw new BadRequestException('Departments should be an array');
            const temp_deps = teacherDTO.departments;
            teacherDTO.departments = []
            for (const department of temp_deps) {
                const departments = await this.teacherRepository.manager.findOne('department', { where: { id: department } }).catch(() => null);
                if (!departments) throw new NotFoundException(`Department not found (ID: ${department})`);
                teacherDTO.departments.push(departments);
            }
        }

        if (teacherDTO.lessons) {
            const lessons = await this.teacherRepository.manager.findOne('lesson', { where: { id: teacherDTO.lessons } }).catch(() => null);
            if (!lessons) throw new NotFoundException('Lesson not found');
        }


        const teacher = this.teacherRepository.create(teacherDTO);

        return this.teacherRepository.save(teacher);
    }

    async updateTeacher(id: number, teacherDTO: UpdateTeacherDTO) {
        const teacher = await this.teacherRepository.findOne({ where: { id: id }, relations: ['departments', 'user'] }).catch(() => null);
        if (!teacher) throw new NotFoundException('Teacher not found');

        // Check lessons exists
        if (teacherDTO.lessons) {
            const lessons = await this.teacherRepository.manager.findOne('lesson', { where: { id: teacherDTO.lessons } }).catch(() => null);
            if (!lessons) throw new NotFoundException('Lesson not found');
        }

        // Check departments exists
        if (teacherDTO.departments) {
            if (!(teacherDTO.departments instanceof Array)) throw new BadRequestException('Departments should be an array');
            const temp_deps = [...teacherDTO.departments, ...teacher.departments.map(d => d.id)];
            teacherDTO.departments = []
            for (const department of temp_deps) {
                const departments = await this.teacherRepository.manager.findOne('department', { where: { id: department } }).catch(() => null);
                if (!departments) throw new NotFoundException(`Department not found (ID: ${department})`);
                teacherDTO.departments.push(departments);
            }
        }

        this.teacherRepository.merge(teacher, TeacherDTO.toUpdateJson(teacherDTO));
        const saved = await this.teacherRepository.save(teacher);
        return TeacherDTO.toJson(saved);
    }

    async deleteTeacher(id: number) {
        const teacher = await this.teacherRepository.findOneBy({ id }).catch(() => null);
        if (!teacher) throw new NotFoundException('Teacher not found');
        return this.teacherRepository.delete(id);
    }
}
