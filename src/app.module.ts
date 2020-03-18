import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'demo',
      synchronize: true,
      autoLoadEntities: true
    }),
    CustomersModule,
    PurchasesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
