import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreateTransferRequestDto } from './dto/create-transfer-request.dto';
import { TransferRequest } from './entities/transfer-request.entity';
import { Employee } from '../employees/entities/employee.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TransferRequestsService {
  constructor(
    @InjectRepository(TransferRequest) private readonly transferRequestRepository: Repository<TransferRequest>,
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(user: User, createTransferRequestDto: CreateTransferRequestDto): Promise<TransferRequest> {
    let result;
    await getManager().transaction('SERIALIZABLE', async (transactionalEntityManager) => {
      const employee = await transactionalEntityManager.findOne(Employee, { user });
      if (!employee) {
        throw new NotFoundException(null, 'Employee not found');
      }
      const currentMonth = new Date().getMonth();
      const transferRequest = new TransferRequest();
      transferRequest.month = currentMonth;
      transferRequest.employee = employee;
      transferRequest.currentSalary = employee.salary;
      transferRequest.requestAmount = createTransferRequestDto.request_amount;
      const thisMonthRequest = await transactionalEntityManager.find(TransferRequest, {
        where: { employee, month: currentMonth },
      });

      let totalRequestedAmount = 0;
      for (const r of thisMonthRequest) {
        totalRequestedAmount += r.requestAmount;
      }
      totalRequestedAmount += createTransferRequestDto.request_amount;
      if (totalRequestedAmount > employee.salary * 0.5) {
        throw new BadRequestException(null, 'Total request amount exceeded 50% of salary');
      }

      transferRequest.totalRequestedAmount = totalRequestedAmount;
      result = await transactionalEntityManager.save(transferRequest);
    });

    return result;
  }

  findAll(): Promise<TransferRequest[]> {
    return this.transferRequestRepository.find({
      relations: ['user', 'company'],
    });
  }

  async findOneByEmployeeId(employeeId: string): Promise<TransferRequest> {
    const employee = await this.employeeRepository.findOne({ id: employeeId });
    const result = await this.transferRequestRepository.findOne({
      where: { employee },
      relations: ['employee'],
    });
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }
}
