import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { CustomerPurchases } from './interfaces/customer-total-purchases.interface';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) { }

    @Get()
    findAll(): Promise<Customer[]> {
        return this.customerService.findAll();
    }

    @Get('purchases')
    findAllWPurchases(): Promise<CustomerPurchases[]> {
        return this.customerService.findAllWithPurchases();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Customer> {
        return this.customerService.findOne(id);
    }
}
