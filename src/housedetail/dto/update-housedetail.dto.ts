import { PartialType } from '@nestjs/swagger';
import { CreateHousedetailDto } from './create-housedetail.dto';

export class UpdateHousedetailDto extends PartialType(CreateHousedetailDto) {}
