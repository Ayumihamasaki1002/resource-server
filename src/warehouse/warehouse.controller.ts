import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Warehouse } from './entities/warehouse.entity';

@ApiTags('仓库')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @ApiOperation({ summary: '新建仓库' })
  @ApiResponse({ status: 201, type: [Warehouse] })
  @Post('createHouse')
  createHouse(@Body() createHouse: CreateWarehouseDto) {
    return this.warehouseService.createHouse(createHouse);
  }

  @ApiOperation({ summary: '获取仓库列表' })
  @ApiResponse({ status: 200, type: [Warehouse] })
  @Get(':id')
  getHouseList(@Param('id') ownerId: string) {
    console.log('ownerId', ownerId);
    return this.warehouseService.getHouseList(ownerId);
  }

  @Get()
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.update(+id, updateWarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }
}
