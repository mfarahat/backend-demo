import { PurchaseInfo } from "../interfaces/purchase-info.interface";

export class GroupedPurchasesReportDto {
    purchases: Array<PurchaseInfo> = [];
    totalPoints: number = 0;
    totalValue: number = 0;
}