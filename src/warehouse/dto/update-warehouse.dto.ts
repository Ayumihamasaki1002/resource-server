import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
  @ApiProperty({ description: '仓库ID' })
  @IsNotEmpty({ message: '请输入仓库ID' })
  id: string;
}
