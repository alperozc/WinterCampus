import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './students.entity';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), LessonsModule],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule { }
