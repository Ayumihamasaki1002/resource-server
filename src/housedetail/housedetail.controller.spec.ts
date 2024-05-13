import { Test, TestingModule } from '@nestjs/testing';
import { HousedetailController } from './housedetail.controller';
import { HousedetailService } from './housedetail.service';

describe('HousedetailController', () => {
  let controller: HousedetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousedetailController],
      providers: [HousedetailService],
    }).compile();

    controller = module.get<HousedetailController>(HousedetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
