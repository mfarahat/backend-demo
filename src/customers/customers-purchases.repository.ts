import { EntityRepository, AbstractRepository } from "typeorm";
import { Customer } from "./customer.entity";
import { CustomerPurchases } from "./interfaces/customer-total-purchases.interface";

@EntityRepository(Customer)
export class CustomersPurchasesRepository extends AbstractRepository<Customer>{
    findAllWithPurchases(): Promise<CustomerPurchases[]> {
        return this.createQueryBuilder("customer")
            .select("customer.id", "id")
            .addSelect("customer.firstName", "firstName")
            .addSelect("customer.lastName", "lastName")
            .addSelect("SUM(purchase.value)", "purchasesTotalValue")
            .addSelect("COUNT(purchase.id)", "purchasesCount")
            .leftJoin("customer.purchases", "purchase")
            .groupBy("customer.id")
            .getRawMany();
    }
}
