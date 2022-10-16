import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity({ name: 'transfer_request' })
export class TransferRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'employee_id' })
  @ManyToOne(() => Employee)
  employee: Employee;

  @Column()
  month: number;

  @Column({ name: 'request_amount' })
  requestAmount: number;

  @Column({ name: 'total_requested_amount' })
  totalRequestedAmount: number;

  @Column({ name: 'current_salary' })
  currentSalary: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
