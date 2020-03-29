import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Purchase } from 'src/purchases/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Purchase])],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule { }
