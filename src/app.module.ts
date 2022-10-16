import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';
import { CompaniesModule } from './modules/companies/companies.module';
import { CompanyAdminsModule } from './modules/company-admins/company-admins.module';
import { RouterModule, Routes } from '@nestjs/core';
import { EmployeesModule } from './modules/employees/employees.module';
import { TransferRequestsModule } from './modules/transfer-requests/transfer-requests.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/companies',
        module: CompaniesModule,
      },
      {
        path: '/company-admins',
        module: CompanyAdminsModule,
      },
      {
        path: '/employees',
        module: EmployeesModule,
      },
      {
        path: '/transfer-request',
        module: TransferRequestsModule,
      },
    ],
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),
    RouterModule.register(routes),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    CompaniesModule,
    CompanyAdminsModule,
    EmployeesModule,
    TransferRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
