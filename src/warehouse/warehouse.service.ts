import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // 创建仓库
  async createHouse(createHouse: CreateWarehouseDto) {
    const { housename, owner } = createHouse;
    console.log(createHouse);
    const existHouse = await this.warehouseRepository.findOne({
      where: { housename },
    });
    if (existHouse) throw new HttpException('仓库名已存在', HttpStatus.BAD_REQUEST);

    const newHouse = this.warehouseRepository.create();
    newHouse.housename = housename;
    await this.warehouseRepository.save(newHouse);
    const user = await this.userRepository.findOne({
      where: { id: owner },
      relations: ['warehouses'], // 加载用户的仓库关联
    });
    console.log(user.warehouses);

    if (user.warehouses === undefined) user.warehouses = [];
    user.warehouses.push(newHouse);

    await this.userRepository.save(user);

    return await this.userRepository.save(user);
  }

  async getHouseList(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['warehouses'], // 加载用户的仓库关联
    });
    return user;
  }

  findAll() {
    return `This action returns all warehouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouse`;
  }

  update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return `This action updates a #${id} warehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }
}
