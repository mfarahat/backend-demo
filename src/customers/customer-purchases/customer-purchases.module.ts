import { Module } from '@nestjs/common';
import { CustomerPurchasesService } from './customer-purchases.service';
import { CustomerPurchasesController } from './customer-purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer.entity';
import { Purchase } from '../../purchases/purchase.entity';
import { PurchaseChartRepository } from './purchase-chart.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Purchase, PurchaseChartRepository])],
    providers: [CustomerPurchasesService],
    controllers: [CustomerPurchasesController]
})
export class CustomerPurchasesModule { }
