import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPurchasesService } from './customer-purchases.service';

describe('CustomerPurchasesService', () => {
  let service: CustomerPurchasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerPurchasesService],
    }).compile();

    service = module.get<CustomerPurchasesService>(CustomerPurchasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
