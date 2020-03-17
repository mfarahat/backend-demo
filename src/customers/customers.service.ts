import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerWTotalPurchases } from './interfaces/customer-total-purchases.interface';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(CustomerEntity)
        private customerRepo: Repository<CustomerEntity>
    ) { }

}
