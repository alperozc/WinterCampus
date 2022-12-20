import { Module } from '@nestjs/common';
import { InstitutesService } from './institutes.service';
import { InstitutesController } from './institutes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institute } from './institutes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institute])],
  controllers: [InstitutesController],
  providers: [InstitutesService]
})
export class InstitutesModule { }
