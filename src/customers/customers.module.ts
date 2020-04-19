import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerPurchasesModule } from './customer-purchases/customer-purchases.module';
import { CustomersPurchasesRepository } from './customers-purchases.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomersPurchasesRepository]), CustomerPurchasesModule],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule { }
