import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { FacultiesModule } from './faculties/faculties.module';
import { DepartmentsModule } from './departments/departments.module';
import { InstitutesModule } from './institutes/institutes.module';
import { StudentsModule } from './students/students.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    RolesModule,
    FacultiesModule,
    DepartmentsModule,
    InstitutesModule,
    StudentsModule,
    LessonsModule,
  ],
  providers: [],
})
export class AppModule { }