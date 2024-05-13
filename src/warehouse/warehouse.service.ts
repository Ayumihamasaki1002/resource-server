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
    if (user.warehouses === undefined) user.warehouses = [];
    user.warehouses.push(newHouse);
    await this.userRepository.save(user);
    return await this.userRepository.save(user);
  }

  // 获取仓库列表
  async getHouseList(userId: string) {
    const houseList = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['warehouses', 'warehouses.files'], // 加载用户的仓库关联
    });
    return houseList;
  }

  // 获取单个仓库
  async getHouse(id: string) {
    console.log('123');

    const house = await this.warehouseRepository.findOne({
      where: { id },
      relations: ['files'], // 加载仓库的文件关联
    });
    console.log(house);
    if (!house) throw new HttpException('仓库不存在', HttpStatus.BAD_REQUEST);
    return house;
  }

  // 修改仓库信息
  async updateHouse(updateHouseDto: UpdateWarehouseDto) {
    const { id, housename, owner } = updateHouseDto;
    const user = await this.userRepository.findOne({
      where: { id: owner },
      relations: ['warehouses'], // 加载用户的仓库关联
    });
    if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    const house = user.warehouses.find((item) => item.id === id);
    if (!house) throw new HttpException('仓库不存在', HttpStatus.BAD_REQUEST);
    house.housename = housename;
    await this.warehouseRepository.save(house);
  }

  // 删除仓库
  async deleteHouse(id: string, owner: string) {
    const user = await this.userRepository.findOne({
      where: { id: owner },
      relations: ['warehouses'], // 加载用户的仓库关联
    });
    if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    const house = user.warehouses.find((item) => item.id === id);
    if (!house) throw new HttpException('仓库不存在', HttpStatus.BAD_REQUEST);
    user.warehouses = user.warehouses.filter((item) => item.id !== id);
    await this.warehouseRepository.remove(house);
    await this.userRepository.save(user);
  }
}
