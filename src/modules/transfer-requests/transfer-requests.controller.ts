import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
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
export class TransferRequestsController {
  constructor(private readonly transferRequestsService: TransferRequestsService) {
  }

  @Post()
  @Roles(Role.EMPLOYEE)
  create(@Request() req, @Body() createEmployeeDto: CreateTransferRequestDto) {
    return this.transferRequestsService.create(req.user, createEmployeeDto);
  }

  @Get()
  @Roles(Role.EMPLOYEE)
  findAll(@Request() req) {
    return this.transferRequestsService.findAll(req.user);
  }

  @Get(':employeeId')
  @Roles(Role.COMPANY_ADMIN)
  findOne(@Param('employeeId') id: string) {
    return this.transferRequestsService.findByEmployeeId(id);
  }
}
