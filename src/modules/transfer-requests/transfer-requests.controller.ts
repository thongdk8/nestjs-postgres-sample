import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { Roles } from '../../custom.decorator';
import { Role } from '../users/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransferRequestsService } from './transfer-requests.service';
import { CreateTransferRequestDto } from './dto/create-transfer-request.dto';

@Controller('employees')
@ApiTags('Company Employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.EMPLOYEE)
export class TransferRequestsController {
  constructor(private readonly transferRequestsService: TransferRequestsService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateTransferRequestDto) {
    return this.transferRequestsService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.transferRequestsService.findAll();
  }

  @Get(':employeeId')
  findOne(@Param('employeeId') id: string) {
    return this.transferRequestsService.findOneByEmployeeId(id);
  }
}
