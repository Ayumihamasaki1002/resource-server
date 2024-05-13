import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HousedetailService } from './housedetail.service';
import { CreateHousedetailDto } from './dto/create-housedetail.dto';
import { UpdateHousedetailDto } from './dto/update-housedetail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Housedetail } from './entities/housedetail.entity';

@ApiTags('文件')
@Controller('housedetail')
export class HousedetailController {
  constructor(private readonly housedetailService: HousedetailService) {}

  @ApiOperation({ summary: '添加文件' })
  @ApiResponse({ status: 201, type: [Housedetail] })
  @Post('add')
  addFile(@Body() createHousedetailDto: CreateHousedetailDto) {
    return this.housedetailService.addFile(createHousedetailDto);
  }

  @Post()
  create(@Body() createHousedetailDto: CreateHousedetailDto) {
    return this.housedetailService.create(createHousedetailDto);
  }

  @Get()
  findAll() {
    return this.housedetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housedetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHousedetailDto: UpdateHousedetailDto) {
    return this.housedetailService.update(+id, updateHousedetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housedetailService.remove(+id);
  }
}
