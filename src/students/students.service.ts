import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './students.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDTO, StudentDTO, UpdateStudentDTO } from './dto/students.dto';

@Injectable()
export class StudentsService {

    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) {
    }

    async getStudents() {
        const students = await this.studentRepository.find({ relations: ['user', 'department'] })
        return StudentDTO.toJsonMap(students)
    }

    async getStudent(id: number) {
        const student = await this.studentRepository.findOne({ where: { id: id }, relations: ['department', 'user'] }).catch(() => null)
        if (!student) throw new NotFoundException('Student not found')
        return StudentDTO.toJson(student)
    }

    async createStudent(studentDTO: CreateStudentDTO) {
        const student = this.studentRepository.create(studentDTO)

        // Check user exists
        const user = await this.studentRepository.manager.findOne('user', { where: { id: studentDTO.user } }).catch(() => null)
        if (!user) throw new NotFoundException('User not found')

        if (student.department) {
            const department = await this.studentRepository.manager.findOne('department', { where: { id: studentDTO.department } }).catch(() => null)
            if (!department) throw new NotFoundException('Department not found')
        }

        return this.studentRepository.save(student)
    }

    async updateStudent(id: number, userDTO: UpdateStudentDTO) {
        const student = await this.studentRepository.findOne({ where: { id: id }, relations: ['department', 'user'] }).catch(() => null)
        if (!student) throw new NotFoundException('Student not found')

        if (userDTO.department) {
            const department = await this.studentRepository.manager.findOne('department', { where: { id: userDTO.department } }).catch(() => null)
            if (!department) throw new NotFoundException('Department not found')
        }

        this.studentRepository.merge(student, StudentDTO.toUpdateJson(userDTO))
        const saved = await this.studentRepository.save(student)
        return StudentDTO.toJson(saved)
    }

    async deleteStudent(id: number) {
        const student = await this.studentRepository.findOneBy({ id }).catch(() => null)
        if (!student) throw new NotFoundException('Student not found')
        return this.studentRepository.delete(id)
    }


}
