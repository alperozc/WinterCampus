import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lessons.entity';
import { Repository } from 'typeorm';
import { CreateLessonDTO, LessonDTO, UpdateLessonDTO } from './dto/lessons.dto';

@Injectable()
export class LessonsService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>
    ) { }

    async getLessons() {
        const lessons = await this.lessonRepository.find({ relations: ['departments', 'teacher', 'students'] })
        return LessonDTO.toJsonMap(lessons)
    }

    async getLesson(id: number) {
        const lesson = await this.lessonRepository.findOne({ where: { id: id }, relations: ['departments', 'teacher', 'students'] }).catch(() => null)
        if (!lesson) throw new NotFoundException('Lesson not found')
        return LessonDTO.toJson(lesson)
    }

    async createLesson(lessonDTO: CreateLessonDTO) {

        if (lessonDTO.teacher) {
            const teacher = await this.lessonRepository.manager.findOne('teacher', { where: { id: lessonDTO.teacher } }).catch(() => null)
            if (!teacher) throw new NotFoundException('Teacher not found')
        }

        if (lessonDTO.departments) {
            if (!(lessonDTO.departments instanceof Array)) throw new BadRequestException('Departments should be an array');
            const temp_deps = lessonDTO.departments;
            lessonDTO.departments = []
            for (const department of temp_deps) {
                const departments = await this.lessonRepository.manager.findOne('department', { where: { id: department } }).catch(() => null);
                if (!departments) throw new NotFoundException(`Department not found (ID: ${department})`);
                lessonDTO.departments.push(departments);
            }
        }

        if (lessonDTO.students) {
            if (!(lessonDTO.students instanceof Array)) throw new BadRequestException('Students should be an array');
            const temp_studs = lessonDTO.students;
            lessonDTO.students = []
            for (const student of temp_studs) {
                const students = await this.lessonRepository.manager.findOne('student', { where: { id: student } }).catch(() => null);
                if (!students) throw new NotFoundException(`Student not found (ID: ${student})`);
                lessonDTO.students.push(students);
            }
        }

        const lesson = this.lessonRepository.create(lessonDTO)

        return this.lessonRepository.save(lesson);
    }

    async updateLesson(id: number, lessonDTO: UpdateLessonDTO) {
        const lesson = await this.lessonRepository.findOneBy({ id }).catch(() => null)
        if (!lesson) throw new NotFoundException('Lesson not found')

        if (lessonDTO.teacher) {
            const teacher = await this.lessonRepository.manager.findOne('teacher', { where: { id: lessonDTO.teacher } }).catch(() => null)
            if (!teacher) throw new NotFoundException('Teacher not found')
        }

        if (lessonDTO.departments) {
            if (!(lessonDTO.departments instanceof Array)) throw new BadRequestException('Departments should be an array');
            const temp_deps = lessonDTO.departments //[...lessonDTO.departments, ...lesson.departments.map(d => d.id)];
            lessonDTO.departments = []
            for (const department of temp_deps) {
                const departments = await this.lessonRepository.manager.findOne('department', { where: { id: department } }).catch(() => null);
                if (!departments) throw new NotFoundException(`Department not found (ID: ${department})`);
                lessonDTO.departments.push(departments);
            }
        }

        if (lessonDTO.students) {
            if (!(lessonDTO.students instanceof Array)) throw new BadRequestException('Students should be an array');
            const temp_studs = lessonDTO.students //[...lessonDTO.students, ...lesson.students.map(s => s.id)];
            lessonDTO.students = []
            for (const student of temp_studs) {
                const students = await this.lessonRepository.manager.findOne('student', { where: { id: student } }).catch(() => null);
                if (!students) throw new NotFoundException(`Student not found (ID: ${student})`);
                lessonDTO.students.push(students);
            }
        }

        this.lessonRepository.merge(lesson, LessonDTO.toUpdateJson(lessonDTO))
        const saved = await this.lessonRepository.save(lesson)
        return LessonDTO.toJson(saved)
    }

    async deleteLesson(id: number) {
        const lesson = await this.lessonRepository.findOneBy({ id }).catch(() => null)
        if (!lesson) throw new NotFoundException('Lesson not found')
        return this.lessonRepository.delete(id)
    }
}
