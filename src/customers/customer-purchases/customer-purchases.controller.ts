import { Controller, Get, Param } from '@nestjs/common';
import { CustomerPurchasesService } from './customer-purchases.service';
import { DateLimitsDto } from './dto/date-limits'
import { GroupedPurchasesReport } from './dto/purchases-reports';

@Controller('customer-purchases/:id')
export class CustomerPurchasesController {

    constructor(private readonly customerPurchasesService: CustomerPurchasesService) { }

    @Get('date-limits')
    getDateLimits(@Param('id') customerId: number): Promise<DateLimitsDto> {
        return this.customerPurchasesService.getDateLimits(customerId);
    }

    @Get('purchase-data')
    getPurchaseData(@Param('id') customerId: number): Promise<GroupedPurchasesReport> {
        const end = new Date("2019-12-12T00:35:59.000Z");
        const start = new Date("2017-09-19T09:19:25.000Z");
        return this.customerPurchasesService.getPurchaseData(customerId, start, end);
    }
}
