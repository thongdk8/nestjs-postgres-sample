import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyAdmin } from './entities/company-admin.entity';
import { CreateCompanyAdminDto } from './dto/create-company-admin.dto';
import * as bcryptjs from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/enums/role.enum';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class CompanyAdminsService {
  constructor(
    @InjectRepository(CompanyAdmin) private readonly companyAdminRepository: Repository<CompanyAdmin>,
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyAdminDto: CreateCompanyAdminDto): Promise<CompanyAdmin> {
    const companyAdmin = new CompanyAdmin();
    companyAdmin.company = await this.companyRepository.findOne({ where: { id: createCompanyAdminDto.companyId } });

    const user = new User();
    user.name = createCompanyAdminDto.name;
    user.email = createCompanyAdminDto.email;
    user.password = bcryptjs.hashSync(createCompanyAdminDto.password, 10);
    user.role = Role.COMPANY_ADMIN;

    companyAdmin.user = user;
    return this.companyAdminRepository.save(companyAdmin);
  }

  findAll(): Promise<CompanyAdmin[]> {
    return this.companyAdminRepository.find({
      relations: ['user', 'company'],
    });
  }

  async findOne(id: string): Promise<CompanyAdmin> {
    const result = await this.companyAdminRepository.findOne({
      where: { id },
      relations: ['user', 'company'],
    });
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<void> {
    await this.companyAdminRepository.delete(id);
  }
}
