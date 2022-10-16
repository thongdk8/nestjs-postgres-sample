import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

// This should be a real class/interface representing a user entity
// export type Company = any;

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(Company) private readonly companiesRepository: Repository<Company>) {}

  create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company();

    company.name = createCompanyDto.name;
    company.description = createCompanyDto.description;
    return this.companiesRepository.save(company);
  }

  findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  async findOne(id: string): Promise<Company> {
    const result = await this.companiesRepository.findOne({ id });
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companiesRepository.update(id, updateCompanyDto);
  }

  async remove(id: string): Promise<void> {
    await this.companiesRepository.delete(id);
  }
}
