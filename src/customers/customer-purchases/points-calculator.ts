import { GroupedPurchasesReportDto } from "./dto/purchases-reports";
import * as moment from 'moment';
import { PurchaseInfo } from "./interfaces/purchase-info.interface";

type RewardRule = { min?: number, pointValue: number };

export class PointsCalculator {
    constructor(private rewardRules: Array<RewardRule>) { }

    getPurchasesReport(purchaseData: PurchaseInfo[]): GroupedPurchasesReportDto {
        const groupedPurchasesReport: GroupedPurchasesReportDto = new GroupedPurchasesReportDto();
        for (const purchase of purchaseData) {
            purchase.points = this.getPoints(purchase.value);
            this.groupPurchases(purchase, groupedPurchasesReport.purchases);
            groupedPurchasesReport.totalPoints += purchase.points;
            groupedPurchasesReport.totalValue += purchase.value;
        }
        return groupedPurchasesReport;
    }

    groupPurchases(purchase: PurchaseInfo, groupedPurchasesArr: PurchaseInfo[]) {
        let lastAddedGroupedPurchases: PurchaseInfo = groupedPurchasesArr[groupedPurchasesArr.length - 1];
        const modifiedDate: Date = moment(purchase.date).set('date', 15).toDate();
        if (lastAddedGroupedPurchases &&
            lastAddedGroupedPurchases.date.getMonth() === purchase.date.getMonth()) {
            lastAddedGroupedPurchases.points += purchase.points;
            lastAddedGroupedPurchases.value += purchase.value;
        } else {
            if (lastAddedGroupedPurchases &&
                lastAddedGroupedPurchases.date.getMonth() !== purchase.date.getMonth()) {
                groupedPurchasesArr.push(...this.fillTimeGap(lastAddedGroupedPurchases.date, modifiedDate));
            }
            groupedPurchasesArr.push({
                date: modifiedDate,
                points: purchase.points,
                value: purchase.value
            });
        }
    }

    fillTimeGap(previousDate: Date, currentDate: Date): PurchaseInfo[] {
        const fillerArr: Array<PurchaseInfo> = [];
        let indexDate: Date = previousDate;
        const diff:number = this.getMonthsDiff(currentDate, previousDate);
        while ( this.getMonthsDiff(currentDate, indexDate)> 1) {
            indexDate = moment(indexDate).add(1, 'month').toDate();
            fillerArr.push({ date: indexDate, value: 0, points: 0 });
        }
        return fillerArr;
    }

    getMonthsDiff(currentDate: Date, previousDate: Date): number {
        return moment([currentDate.getFullYear(), currentDate.getMonth()])
            .diff([previousDate.getFullYear(), previousDate.getMonth()], 'month');
    }

    private getPoints(remainingValue: number): number {
        let points = 0;
        for (let i = 0; i < this.rewardRules.length; i++) {
            const rewardRule = this.rewardRules[i];
            if (remainingValue <= 0)
                break;

            points += (rewardRule.min && remainingValue > rewardRule.min)
                ? rewardRule.pointValue * rewardRule.min
                : rewardRule.pointValue * remainingValue;

            remainingValue -= rewardRule.min ? rewardRule.min : 0;
        }
        return points;
    }
}