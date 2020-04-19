import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPurchasesService } from './customer-purchases.service';
import { Repository } from 'typeorm';
import { Purchase } from '../../purchases/purchase.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerPurchasesRepository } from './customer-purchases.repository';
import { DateLimitsDto } from './dto/date-limits';
import { PurchaseInfo } from './interfaces/purchase-info.interface';
import { GroupedPurchasesReportDto } from './dto/purchases-reports';

describe('CustomerPurchasesService', () => {
  let customerPurchasesService: CustomerPurchasesService;
  let customerPurchasesRepository: CustomerPurchasesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerPurchasesService,
        {
          provide: getRepositoryToken(CustomerPurchasesRepository),
          useClass: CustomerPurchasesRepository,
        },
      ],
    }).compile();

    customerPurchasesService = module.get<CustomerPurchasesService>(CustomerPurchasesService);
    customerPurchasesRepository = module.get<CustomerPurchasesRepository>(getRepositoryToken(CustomerPurchasesRepository));
  });

  it('should be defined', () => {
    expect(customerPurchasesService).toBeDefined();
  });

  it('should return date ranges for customers', async () => {
    const mockedDateLimits: DateLimitsDto = {
      min: new Date(),
      max: new Date(),
    };

    jest.spyOn(customerPurchasesRepository, 'findDateLimits').mockResolvedValueOnce(mockedDateLimits);
    expect(await customerPurchasesService.getDateLimits(5)).toEqual(mockedDateLimits);
  });

  it('should return purchases data report', async () => {
    const startDate = new Date(2018, 0, 30);
    const endDate = new Date(2018, 2, 1);
    const mockedPurchasesInfo: Array<PurchaseInfo> = [
      { date: startDate, value: 769 },
      { date: endDate, value: 709 }
    ];
    const mockedResult: GroupedPurchasesReportDto = {
      purchases: [
        { date: new Date(2018, 0, 15), value: 769, points: 1388 },
        { date: new Date(2018, 1, 15), value: 0, points: 0 },
        { date: new Date(2018, 2, 15), value: 709, points: 1268 }
      ],
      totalPoints: 2656,
      totalValue: 1478
    }
    jest.spyOn(customerPurchasesRepository, 'findPurchaseInfo').mockResolvedValueOnce(mockedPurchasesInfo);
    const result: GroupedPurchasesReportDto = await customerPurchasesService.getPurchaseData(1, startDate, endDate);
    expect(result).toEqual(mockedResult);
  });
});
