import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('warehouse')
export class Warehouse {
  @ApiProperty({ description: '仓库信息' })
  @PrimaryGeneratedColumn('uuid')
  houseid: string;

  @Column({ length: 100, nullable: false })
  housename: string;

  @ManyToOne(() => User, (owner) => owner.warehouses)
  owner: User;
}
