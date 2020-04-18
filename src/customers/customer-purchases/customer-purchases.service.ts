import { Injectable } from '@nestjs/common';
import { DateLimitsDto } from './dto/date-limits';
import { PurchaseChartRepository } from './purchase-chart.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupedPurchasesReportDto } from './dto/purchases-reports';
import { Purchase } from './../../purchases/purchase.entity';
import { Repository, Between } from 'typeorm';
import { PointsCalculator } from './points-calculator';
import { PurchaseInfo } from './interfaces/purchase-info.interface';

@Injectable()
export class CustomerPurchasesService {
    constructor(
        @InjectRepository(PurchaseChartRepository)
        private readonly purchaseChartRepository: PurchaseChartRepository,

        @InjectRepository(Purchase)
        private readonly purchaseRepo: Repository<Purchase>) {
    }

    getDateLimits(customerId: number): Promise<DateLimitsDto> {
        return this.purchaseChartRepository.findDateLimits(customerId);
    }

    async getPurchaseData(customerId: number, start: Date, end: Date): Promise<GroupedPurchasesReportDto> {
        let purchaseData: Array<PurchaseInfo> = await this.purchaseRepo.find({
            select: ["value", "date"],
            where: { customer: customerId, date: Between(start, end) },
            order: {
                date: "ASC"
            }
        });

        const pointsCalculator: PointsCalculator = new PointsCalculator([
            { min: 50, pointValue: 0 },
            { min: 50, pointValue: 1 },
            { pointValue: 2 }]);

        return pointsCalculator.getPurchasesReport(purchaseData);
    }
}
