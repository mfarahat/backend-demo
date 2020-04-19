import { EntityRepository, AbstractRepository, Between } from "typeorm";
import { Purchase } from "../../purchases/purchase.entity";
import { DateLimitsDto } from "./dto/date-limits";
import { PurchaseInfo } from "./interfaces/purchase-info.interface";

@EntityRepository(Purchase)
export class CustomerPurchasesRepository extends AbstractRepository<Purchase>{
    findDateLimits(customerId: number): Promise<DateLimitsDto> {
        return this.createQueryBuilder("purchase")
            .select("MAX(date)", "max")
            .addSelect("MIN(date)", "min")
            .where("purchase.customerId = :customerId", { customerId: customerId })
            .getRawOne();
    }

    findPurchaseInfo(customerId: number, start: Date, end: Date):Promise<Array<PurchaseInfo>> {
        return this.repository.find({
            select: ["value", "date"],
            where: { customer: customerId, date: Between(start, end) },
            order: {
                date: "ASC"
            }
        });
    }
}
