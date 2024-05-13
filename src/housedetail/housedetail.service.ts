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

  // 获取单个文件
  async getFile(id: string, fileId: string) {
    const findHouse = await this.warehouseRepository.findOne({
      where: { id },
      relations: ['files'],
    });
    if (!findHouse) throw new HttpException('仓库名不存在', HttpStatus.BAD_REQUEST);
    const findFile = await this.housedetailRepository.findOne({
      where: { id: fileId },
    });
    if (!findFile) throw new HttpException('文件名不存在', HttpStatus.BAD_REQUEST);
    const findFileIndex = findHouse.files.findIndex((item) => item.id === fileId);
    if (findFileIndex === -1) throw new HttpException('文件名不存在', HttpStatus.BAD_REQUEST);
    return findHouse.files[findFileIndex];
  }

  // 修改文件内容
  async updateFile(fileId: string, file: UpdateHousedetailDto) {
    const findFile = await this.housedetailRepository.findOne({
      where: { id: fileId },
    });
    if (!findFile) throw new HttpException('文件名不存在', HttpStatus.BAD_REQUEST);
    const { fileName, fileContent } = file;
    if (fileName) findFile.name = fileName;
    if (fileContent) findFile.content = fileContent;
    await this.housedetailRepository.save(findFile);
  }

  // 删除文件
  async deleteFile(fileId: string) {
    const findFile = await this.housedetailRepository.findOne({
      where: { id: fileId },
    });
    if (!findFile) throw new HttpException('文件不存在', HttpStatus.BAD_REQUEST);
    await this.housedetailRepository.delete(fileId);
  }
}
