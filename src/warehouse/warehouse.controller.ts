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

  // 创建仓库
  @ApiOperation({ summary: '新建仓库' })
  @ApiResponse({ status: 201, type: [Warehouse] })
  @Post('createHouse')
  createHouse(@Body() createHouse: CreateWarehouseDto) {
    return this.warehouseService.createHouse(createHouse);
  }

  // 获取仓库列表
  @ApiOperation({ summary: '获取仓库列表' })
  @ApiResponse({ status: 200, type: [Warehouse] })
  @Get(':ownerId')
  getHouseList(@Param('ownerId') ownerId: string) {
    return this.warehouseService.getHouseList(ownerId);
  }

  // 获取单个仓库
  @ApiOperation({ summary: '获取单个仓库' })
  @ApiResponse({ status: 200, type: [Warehouse] })
  @Get('/getHouse/:houseId')
  getHouse(@Param('houseId') houseId: string) {
    return this.warehouseService.getHouse(houseId);
  }

  // 修改仓库信息
  @ApiOperation({ summary: '修改仓库信息' })
  @ApiResponse({ status: 200, type: [Warehouse] })
  @Patch()
  updateHouse(@Body() updateHouse: UpdateWarehouseDto) {
    return this.warehouseService.updateHouse(updateHouse);
  }

  // 删除仓库
  @ApiOperation({ summary: '删除仓库' })
  @ApiResponse({ status: 200, type: [Warehouse] })
  @Delete()
  deleteHouse(@Body() deleteHouse: UpdateWarehouseDto) {
    const { id, owner } = deleteHouse;
    return this.warehouseService.deleteHouse(id, owner);
  }
}
