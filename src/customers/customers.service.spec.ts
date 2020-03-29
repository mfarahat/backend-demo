import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CustomersService', () => {
  let customerService: CustomersService;
  let customerRepo: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
    }).compile();

    customerService = module.get<CustomersService>(CustomersService);
    customerRepo = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', async () => {
    expect(customerService).toBeDefined();
  });

  it('should return for findAll', () => {
    const mockedCustomer: Customer = {
      id: 1,
      firstName: 'Katerine',
      lastName: 'Pyrton',
      purchases: []
    };
    jest.spyOn(customerRepo, 'find').mockResolvedValueOnce([mockedCustomer]);
    expect(customerService.findAll()).resolves.toEqual([mockedCustomer]);
  });

  it('should return one customer info', () => {
    const customerId = 1;
    const mockedCustomer: Customer = {
      id: 1,
      firstName: 'Katerine',
      lastName: 'Pyrton',
      purchases: []
    };
    jest.spyOn(customerRepo, 'findOneOrFail').mockResolvedValueOnce(mockedCustomer);
    expect(customerService.findOne(customerId)).resolves.toEqual(mockedCustomer);
  });

  // it('should return customers with total purchases', () => {
  //   customerService.findAllWPurchases();
  //   expect(true).toBeFalsy();
  // });
});
