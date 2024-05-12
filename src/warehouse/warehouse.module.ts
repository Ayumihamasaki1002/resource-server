import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse]), TypeOrmModule.forFeature([User])],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
