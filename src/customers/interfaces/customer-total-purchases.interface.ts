import { Customer } from "./customer.interface";

export interface CustomerPurchases extends Customer {
    purchasesCount: number,
    purchasesTotalValue: number
}
