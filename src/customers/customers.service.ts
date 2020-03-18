import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepo: Repository<CustomerEntity>
    ) { }

    async findAll(): Promise<CustomerEntity[]> {
        return await this.customerRepo.find();
    }
}
