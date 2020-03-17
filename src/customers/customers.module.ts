import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { CustomersService } from './customers.service';

@Module({
  imports:[TypeOrmModule.forFeature([CustomerEntity])],
  providers:[CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
