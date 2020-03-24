import { Module } from '@nestjs/common';
import { Purchase } from './purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Purchase])],
    exports: [TypeOrmModule]
})
export class PurchasesModule { }
