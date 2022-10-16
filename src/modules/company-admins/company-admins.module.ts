import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyAdmin } from './entities/company-admin.entity';
import { CompanyAdminsService } from './company-admins.service';
import { CompanyAdminsController } from './company-admins.controller';
import { Company } from '../companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyAdmin, Company])],
  controllers: [CompanyAdminsController],
  providers: [CompanyAdminsService],
  exports: [CompanyAdminsService],
})
export class CompanyAdminsModule {}
