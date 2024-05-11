import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Warehouse } from '../entities/warehouse.entity';
export class CreateWarehouseDto {
  @ApiProperty({ description: '仓库名' })
  @IsNotEmpty({ message: '请输入仓库名' })
  housename: string;

  @ApiProperty({ description: '拥有者' })
  @IsNotEmpty({ message: '请输入拥有者' })
  owner: Warehouse;
}
