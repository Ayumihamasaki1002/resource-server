import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Housedetail } from 'src/housedetail/entities/housedetail.entity';

@Entity('warehouse')
export class Warehouse {
  @ApiProperty({ description: '仓库信息' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  housename: string;

  @ManyToOne(() => User, (owner) => owner.warehouses)
  owner: User;

  @OneToMany(() => Housedetail, (files) => files.warehouse)
  files: Housedetail[];
}
