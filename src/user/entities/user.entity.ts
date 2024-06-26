import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
// import { PostsEntity } from 'src/posts/posts.entity';
@Entity('user')
export class User {
  @ApiProperty({ description: '用户id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: true })
  username: string;

  @Column({ length: 100, nullable: true })
  nickname: string;

  @Exclude()
  @Column({ select: false, nullable: true })
  password: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  openid: string;

  @Column({ default: null })
  github: string;

  @Column({ default: null })
  csdn: string;

  @Column({ default: null })
  juejin: string;

  @Column({ length: 50, default: null })
  intro: string;

  @Column({ length: 1000, default: null })
  warehouseFacePage: string;

  @Column('enum', { enum: ['root', 'author', 'visitor'], default: 'visitor' })
  role: string;

  // 一对多 用户与仓库
  @OneToMany(() => Warehouse, (warehouse) => warehouse.owner)
  warehouses: Warehouse[];

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Exclude()
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    if (!this.password) return;
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
