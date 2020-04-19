import { Injectable } from '@nestjs/common';
import { DateLimitsDto } from './dto/date-limits';
import { CustomerPurchasesRepository } from './customer-purchases.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupedPurchasesReportDto } from './dto/purchases-reports';
import { PointsCalculator } from './points-calculator';
import { PurchaseInfo } from './interfaces/purchase-info.interface';

@Injectable()
export class CustomerPurchasesService {
    constructor(
        @InjectRepository(CustomerPurchasesRepository)
        private readonly customerPurchasesRepository: CustomerPurchasesRepository) {
    }

    getDateLimits(customerId: number): Promise<DateLimitsDto> {
        return this.customerPurchasesRepository.findDateLimits(customerId);
    }

    async getPurchaseData(customerId: number, start: Date, end: Date): Promise<GroupedPurchasesReportDto> {
        let purchaseData: Array<PurchaseInfo> = await this.customerPurchasesRepository.findPurchaseInfo(customerId, start, end);

        const pointsCalculator: PointsCalculator = new PointsCalculator([
            { min: 50, pointValue: 0 },
            { min: 50, pointValue: 1 },
            { pointValue: 2 }]);

        return pointsCalculator.getPurchasesReport(purchaseData);
    }
}
