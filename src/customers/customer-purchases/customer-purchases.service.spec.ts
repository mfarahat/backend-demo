import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPurchasesService } from './customer-purchases.service';
import { Repository } from 'typeorm';
import { Purchase } from '../../purchases/purchase.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PurchaseChartRepository } from './purchase-chart.repository';

describe('CustomerPurchasesService', () => {
  let customerPurchasesService: CustomerPurchasesService;
  let purchaseRepo: Repository<Purchase>;
  let purchaseChartRepo: Repository<PurchaseChartRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerPurchasesService,
        {
          provide: getRepositoryToken(Purchase),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PurchaseChartRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    customerPurchasesService = module.get<CustomerPurchasesService>(CustomerPurchasesService);
    purchaseRepo = module.get<Repository<Purchase>>(getRepositoryToken(Purchase));
    purchaseChartRepo = module.get<Repository<PurchaseChartRepository>>(getRepositoryToken(PurchaseChartRepository));
  });

  it('should be defined', () => {
    expect(customerPurchasesService).toBeDefined();
  });
});
