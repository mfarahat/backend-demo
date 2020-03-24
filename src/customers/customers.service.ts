import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerPurchases } from './interfaces/customer-total-purchases.interface';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>
  ) { }

  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  async findOne(id: number): Promise<Customer> {
    return this.customerRepo.findOneOrFail(id);
  }

  async findAllWithPurchases() {
    return this.customerRepo.createQueryBuilder("customer")
      .select("customer.id", "id")
      .addSelect("customer.firstName", "firstName")
      .addSelect("customer.lastName", "lastName")
      .addSelect("SUM(purchase.value)", "purchasesTotalValue")
      .addSelect("COUNT(purchase.id)", "purchasesCount")
      .leftJoin("customer.purchases", "purchase")
      .groupBy("customer.id")
      .getRawMany();
  }
}
