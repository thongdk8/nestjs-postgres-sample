import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { Roles } from '../../custom.decorator';
import { Role } from '../users/enums/role.enum';
import { CompanyAdminsService } from './company-admins.service';
import { CreateCompanyAdminDto } from './dto/create-company-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('company-admins')
@ApiTags('Company Admins')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SYSTEM_ADMIN)
export class CompanyAdminsController {
  constructor(private readonly companyAdminsService: CompanyAdminsService) {}

  @Post()
  create(@Body() createCompanyAdminDto: CreateCompanyAdminDto) {
    return this.companyAdminsService.create(createCompanyAdminDto);
  }

  @Get()
  findAll() {
    return this.companyAdminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyAdminsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyAdminsService.remove(id);
  }
}
