import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerEntity } from './customer.entity';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) { }

    @Get()
    findAll(): Promise<CustomerEntity[]> {
        return this.customerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<CustomerEntity> {
        return this.customerService.findOne(id);
    }
}
