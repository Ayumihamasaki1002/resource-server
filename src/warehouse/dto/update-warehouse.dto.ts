import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateWarehouseDto {
  @ApiProperty({ description: '仓库ID' })
  @IsNotEmpty({ message: '请输入仓库ID' })
  id: string;

  @ApiProperty({ description: '仓库名' })
  @IsNotEmpty({ message: '请输入仓库名' })
  housename: string;
}
