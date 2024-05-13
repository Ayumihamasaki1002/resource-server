import { Test, TestingModule } from '@nestjs/testing';
import { HousedetailService } from './housedetail.service';

describe('HousedetailService', () => {
  let service: HousedetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HousedetailService],
    }).compile();

    service = module.get<HousedetailService>(HousedetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
