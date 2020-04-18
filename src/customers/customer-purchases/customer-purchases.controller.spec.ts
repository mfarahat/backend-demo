import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPurchasesController } from './customer-purchases.controller';
import { CustomerPurchasesService } from './customer-purchases.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Purchase } from './../../purchases/purchase.entity';
import { PurchaseChartRepository } from './purchase-chart.repository';
import { Repository } from 'typeorm';

describe('CustomerPurchases Controller', () => {
  let customerPurchaseController: CustomerPurchasesController;
  let customerPurchaseService: CustomerPurchasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerPurchasesController],
      providers: [
        CustomerPurchasesService,
        {
          provide: getRepositoryToken(Purchase),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PurchaseChartRepository),
          useClass: Repository,
        },]
    }).compile();

    customerPurchaseController = module.get<CustomerPurchasesController>(CustomerPurchasesController);
    customerPurchaseService = module.get<CustomerPurchasesService>(CustomerPurchasesService);
  });

  it('should be defined', () => {
    expect(customerPurchaseController).toBeDefined();
  });
});
