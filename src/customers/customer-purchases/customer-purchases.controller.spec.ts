import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPurchasesController } from './customer-purchases.controller';
import { CustomerPurchasesService } from './customer-purchases.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Purchase } from './../../purchases/purchase.entity';
import { CustomerPurchasesRepository } from './customer-purchases.repository';
import { Repository } from 'typeorm';
import { GroupedPurchasesReportDto } from './dto/purchases-reports';
import { DateLimitsDto } from './dto/date-limits';

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
          provide: getRepositoryToken(CustomerPurchasesRepository),
          useClass: Repository,
        },]
    }).compile();

    customerPurchaseController = module.get<CustomerPurchasesController>(CustomerPurchasesController);
    customerPurchaseService = module.get<CustomerPurchasesService>(CustomerPurchasesService);
  });

  it('should be defined', () => {
    expect(customerPurchaseController).toBeDefined();
  });

  it('should return customer purchase report', async () => {
    const mockedReport: GroupedPurchasesReportDto = {
      "purchases": [{
        "date": new Date(), "points": 0, "value": 36
      }, {
        "date": new Date(), "value": 0, "points": 0
      }],
      "totalPoints": 100, "totalValue": 100
    };

    jest.spyOn(customerPurchaseService, 'getPurchaseData').mockResolvedValueOnce(mockedReport);
    expect(await customerPurchaseController.getPurchaseData(5)).toEqual(mockedReport);
  });

  it('should return date ranges for customers', async () => {
    const mockedDateLimits: DateLimitsDto = {
      min:new Date(),
      max:new Date(),
    };

    jest.spyOn(customerPurchaseService, 'getDateLimits').mockResolvedValueOnce(mockedDateLimits);
    expect(await customerPurchaseController.getDateLimits(5)).toEqual(mockedDateLimits);
  });
});
