import { Test, TestingModule } from '@nestjs/testing';
import { InstitutesController } from './institutes.controller';

describe('InstitutesController', () => {
  let controller: InstitutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitutesController],
    }).compile();

    controller = module.get<InstitutesController>(InstitutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
