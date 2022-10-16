import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/enums/role.enum';
import { Company } from '../companies/entities/company.entity';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee();
    employee.company = await this.companyRepository.findOne({ id: createEmployeeDto.companyId });
    employee.address = createEmployeeDto.address;
    employee.phone = createEmployeeDto.phone;
    employee.salary = createEmployeeDto.salary;

    const user = new User();
    user.name = createEmployeeDto.name;
    user.email = createEmployeeDto.email;
    user.password = bcryptjs.hashSync(createEmployeeDto.password, 10);
    user.role = Role.EMPLOYEE;

    employee.user = user;
    return this.employeeRepository.save(employee);
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const currentEmployee = await this.findOne(id);
    const employee = new Employee();
    employee.id = currentEmployee.id;

    if (updateEmployeeDto.companyId) {
      employee.company = await this.companyRepository.findOne({ id: updateEmployeeDto.companyId });
    }
    employee.address = updateEmployeeDto.address || currentEmployee.address;
    employee.phone = updateEmployeeDto.phone || currentEmployee.phone;
    employee.salary = updateEmployeeDto.salary || currentEmployee.salary;

    const user = new User();
    user.id = currentEmployee.user.id;
    user.name = updateEmployeeDto.name || currentEmployee.user.name;
    if (updateEmployeeDto.password) {
      user.password = bcryptjs.hashSync(updateEmployeeDto.password, 10);
    }

    employee.user = user;

    const updatedEmployee = await this.employeeRepository.preload(employee);

    return this.employeeRepository.save(updatedEmployee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['user', 'company'],
    });
  }

  async findOne(id: string): Promise<Employee> {
    const result = await this.employeeRepository.findOne({
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
    await this.employeeRepository.delete(id);
  }
}
