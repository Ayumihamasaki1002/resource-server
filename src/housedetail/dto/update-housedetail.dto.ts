import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateHousedetailDto {
  @ApiProperty({ description: '文件名' })
  @IsNotEmpty({ message: '请输入文件名' })
  fileName: string;

  @ApiProperty({ description: '文件内容' })
  @IsNotEmpty({ message: '请输入文件内容' })
  fileContent: string;
}
