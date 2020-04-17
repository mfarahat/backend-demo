import { EntityRepository, AbstractRepository } from "typeorm";
import { Purchase } from "../../purchases/purchase.entity";
import { DateLimitsDto } from "./dto/date-limits";

@EntityRepository(Purchase)
export class PurchaseChartRepository extends AbstractRepository<Purchase>{
    findDateLimits(customerId: number): Promise<DateLimitsDto> {
        return this.createQueryBuilder("purchase")
            .select("MAX(date)", "max")
            .addSelect("MIN(date)", "min")
            .where("purchase.customerId = :customerId", { customerId: customerId })
            .getRawOne();
    }
}
