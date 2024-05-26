import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { User } from 'src/user/entities/user.entity';
import { Housedetail } from 'src/housedetail/entities/housedetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Warehouse]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Housedetail]),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports: [TypeOrmModule.forFeature([Warehouse])],
})
export class WarehouseModule {}
