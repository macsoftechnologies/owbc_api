import { Test, TestingModule } from '@nestjs/testing';
import { CheckInController } from './check-in.controller';
import { CheckInService } from './check-in.service';

describe('CheckInController', () => {
  let controller: CheckInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckInController],
      providers: [CheckInService],
    }).compile();

    controller = module.get<CheckInController>(CheckInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
