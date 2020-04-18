export class PurchaseDto {
    value: number;
    date: Date;
    points?: number;
}

export class GroupedPurchasesReport {
    purchases: Array<PurchaseDto> = [];
    totalPoints: number = 0;
    totalValue: number = 0;
}