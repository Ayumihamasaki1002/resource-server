import { Module } from '@nestjs/common';
import { HousedetailService } from './housedetail.service';
import { HousedetailController } from './housedetail.controller';
import { Housedetail } from './entities/housedetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';

@Module({
  controllers: [HousedetailController],
  providers: [HousedetailService],
  exports: [TypeOrmModule.forFeature([Housedetail])],
  imports: [TypeOrmModule.forFeature([Warehouse]), TypeOrmModule.forFeature([Housedetail])],
})
export class HousedetailModule {}
