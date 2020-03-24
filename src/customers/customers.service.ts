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
      .select(["customer.id", "customer.firstName", "customer.lastName"])
      .addSelect("COUNT(purchase.id)", "purchasesCount")
      .addSelect("SUM(purchase.value)", "purchasesTotalValue")
      .leftJoin("customer.purchases", "purchase")
      .groupBy("customer.id");
    // SELECT customer.id, `customer`.`firstName`, `customer`.`lastName`, count(purchase.id) as purchasesCount, SUM(purchase.value) as purchasesTotalValue
    // FROM `customer`
    // LEFT OUTER JOIN `purchase` ON `customer`.`id` = `purchase`.`customer_id`
    // GROUP BY customer.id
  }
}
