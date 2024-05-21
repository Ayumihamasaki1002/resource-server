import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ description: '昵称' })
  @IsNotEmpty({ message: '昵称' })
  nickname: string;

  @ApiProperty({ description: '头像' })
  @IsNotEmpty({ message: '头像' })
  avatar: string;

  @ApiProperty({ description: '邮箱' })
  @IsNotEmpty({ message: '邮箱' })
  email: string;

  @ApiProperty({ description: 'github' })
  @IsNotEmpty({ message: 'github' })
  github: string;

  @ApiProperty({ description: 'csdn' })
  @IsNotEmpty({ message: 'csdn' })
  csdn: string;

  @ApiProperty({ description: 'intro' })
  @IsNotEmpty({ message: 'intro' })
  intro: string;

  @ApiProperty({ description: 'juejin' })
  @IsNotEmpty({ message: 'juejin' })
  juejin: string;

  @ApiProperty({ description: 'role' })
  @IsNotEmpty({ message: 'role' })
  role: string;

  @ApiProperty({ description: 'warehouseFacePage' })
  @IsNotEmpty({ message: 'warehouseFacePage' })
  warehouseFacePage: string;
}
