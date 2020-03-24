import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) { }

    @Get()
    findAll(): Promise<Customer[]> {
        return this.customerService.findAll();
    }

    @Get('purchases')
    findAllWPurchases() {
        return this.customerService.findAllWithPurchases();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Customer> {
        return this.customerService.findOne(id);
    }
}
