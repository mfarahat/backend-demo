import { Module } from '@nestjs/common';
import { CustomerPurchasesService } from './customer-purchases.service';
import { CustomerPurchasesController } from './customer-purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerPurchasesRepository } from './customer-purchases.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerPurchasesRepository])],
    providers: [CustomerPurchasesService],
    controllers: [CustomerPurchasesController]
})
export class CustomerPurchasesModule { }
