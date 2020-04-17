import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Purchase } from '../purchases/purchase.entity';
import { CustomerPurchasesModule } from './customer-purchases/customer-purchases.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Purchase]), CustomerPurchasesModule],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule { }
