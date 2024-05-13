import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';

@Entity('housedetail')
export class Housedetail {
  @ApiProperty({ description: '仓库表单' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '文件名称',
    name: 'name',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    comment: '文件内容',
    name: 'content',
    length: 10000,
    nullable: false,
  })
  content: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.files)
  warehouse: Warehouse;
}
