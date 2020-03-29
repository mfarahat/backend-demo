import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPurchasesController } from './customer-purchases.controller';

describe('CustomerPurchases Controller', () => {
  let controller: CustomerPurchasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerPurchasesController],
    }).compile();

    controller = module.get<CustomerPurchasesController>(CustomerPurchasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
