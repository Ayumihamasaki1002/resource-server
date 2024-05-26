import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { User } from 'src/user/entities/user.entity';
import { Housedetail } from 'src/housedetail/entities/housedetail.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Housedetail)
    private housedetailRepository: Repository<Housedetail>,
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
  // 获取仓库列表，不包含内容 加快页面加载速度
  async getHouseLists(userId: string) {
    const houseList = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['warehouses', 'warehouses.files'], // 加载用户的仓库关联
    });
    houseList.warehouses.forEach((item) => {
      if (item.files.length > 0)
        item.files.forEach((file) => {
          file.content = '';
          console.log(file);
        });
    });
    return houseList.warehouses;
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
    const { id, housename } = updateHouseDto;
    const house = this.warehouseRepository.findOne({
      where: { id },
    });
    if (!house) throw new HttpException('仓库不存在', HttpStatus.BAD_REQUEST);
    (await house).housename = housename;
    await this.warehouseRepository.save(await house);
  }

  // 删除仓库
  async deleteHouse(id: string) {
    const warehouse = await this.warehouseRepository.findOne({
      where: { id },
    });
    if (!warehouse) throw new HttpException('仓库不存在', HttpStatus.BAD_REQUEST);

    const files = await this.housedetailRepository.find({
      where: {
        warehouse: { id },
      },
      relations: ['warehouse'],
    });

    // 逐一删除housedetail记录
    for (const file of files) {
      await this.housedetailRepository.remove(file);
    }

    // 删除warehouse记录
    await this.warehouseRepository.remove(warehouse);
  }
}
