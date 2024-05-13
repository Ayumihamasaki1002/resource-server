import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHousedetailDto } from './dto/create-housedetail.dto';
import { UpdateHousedetailDto } from './dto/update-housedetail.dto';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { Housedetail } from './entities/housedetail.entity';

@Injectable()
export class HousedetailService {
  constructor(
    @InjectRepository(Housedetail)
    private readonly housedetailRepository: Repository<Housedetail>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {}

  // 添加文件
  async addFile(file: CreateHousedetailDto) {
    const { fileName, fileContent, houseId } = file;
    const oldFile = await this.housedetailRepository.findOne({
      where: { name: fileName },
    });
    if (oldFile) throw new HttpException('文件名已存在', HttpStatus.BAD_REQUEST);
    const findHouse = await this.warehouseRepository.findOne({
      where: { id: houseId },
    });
    if (!findHouse) throw new HttpException('仓库名不存在', HttpStatus.BAD_REQUEST);
    const newFile = this.housedetailRepository.create({
      name: fileName,
      content: fileContent,
    });
    await this.housedetailRepository.save(newFile);
    const warehouse = await this.warehouseRepository.findOne({
      where: { id: houseId },
      relations: ['files'],
    });
    if (warehouse.files === undefined) warehouse.files = [];
    warehouse.files.push(newFile);
    await this.warehouseRepository.save(warehouse);
    return await this.warehouseRepository.save(warehouse);
  }

  // 获取所有文件
  async getAllFile(id: string) {
    const allFile = await this.warehouseRepository.findOne({
      where: { id },
      relations: ['files'],
    });
    return allFile;
  }

  create(createHousedetailDto: CreateHousedetailDto) {
    return 'This action adds a new housedetail';
  }

  findAll() {
    return `This action returns all housedetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} housedetail`;
  }

  update(id: number, updateHousedetailDto: UpdateHousedetailDto) {
    return `This action updates a #${id} housedetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} housedetail`;
  }
}
