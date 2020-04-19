import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerPurchases } from './interfaces/customer-total-purchases.interface';
import { CustomersPurchasesRepository } from './customers-purchases.repository';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(CustomersPurchasesRepository)
    private readonly customersPurchasesRepo: CustomersPurchasesRepository
  ) { }

  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  async findOne(id: number): Promise<Customer> {
    return this.customerRepo.findOneOrFail(id);
  }

  async findAllWithPurchases(): Promise<CustomerPurchases[]> {
    return this.customersPurchasesRepo.findAllWithPurchases();
  }
}
