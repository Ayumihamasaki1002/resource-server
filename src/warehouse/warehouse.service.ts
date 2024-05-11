import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async createHouse(createHouse: CreateWarehouseDto) {
    const { housename } = createHouse;
    const existHouse = await this.warehouseRepository.findOne({
      where: { housename },
    });
    if (existHouse) throw new HttpException('仓库名已存在', HttpStatus.BAD_REQUEST);
    const newHouse = this.warehouseRepository.create(createHouse);
    await this.warehouseRepository.save(newHouse);
    return await this.warehouseRepository.save(newHouse);
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
