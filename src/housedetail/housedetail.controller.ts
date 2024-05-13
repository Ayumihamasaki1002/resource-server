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

  @ApiOperation({ summary: '查询所有文件' })
  @ApiResponse({ status: 200, type: [Housedetail] })
  @Get(':id')
  getHouseList(@Param('id') houseId: string) {
    return this.housedetailService.getAllFile(houseId);
  }

  @ApiOperation({ summary: '查询单个文件' })
  @ApiResponse({ status: 200, type: [Housedetail] })
  @Get(':id/:fileId')
  getFile(@Param('id') houseId: string, @Param('fileId') fileId: string) {
    return this.housedetailService.getFile(houseId, fileId);
  }

  @ApiOperation({ summary: '修改单个文件' })
  @ApiResponse({ status: 200, type: [Housedetail] })
  @Patch(':fileId')
  updateFile(@Param('fileId') id: string, @Body() updataFile: UpdateHousedetailDto) {
    return this.housedetailService.updateFile(id, updataFile);
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
