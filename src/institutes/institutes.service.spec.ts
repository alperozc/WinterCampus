import { Test, TestingModule } from '@nestjs/testing';
import { InstitutesService } from './institutes.service';

describe('InstitutesService', () => {
  let service: InstitutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstitutesService],
    }).compile();

    service = module.get<InstitutesService>(InstitutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
