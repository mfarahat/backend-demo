import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { CustomerEntity } from './customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CustomersService', () => {
  let customerService: CustomersService;
  let customerRepo: Repository<CustomerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    customerService = module.get<CustomersService>(CustomersService);
    customerRepo = module.get<Repository<CustomerEntity>>(getRepositoryToken(CustomerEntity));
  });

  it('should be defined', async () => {
    expect(customerService).toBeDefined();
  });

  it('should return for findAll', async () => {
    const mockedCustomer: CustomerEntity = {
      id: 1,
      firstName: 'Katerine',
      lastName: 'Pyrton'
    };
    jest.spyOn(customerRepo, 'find').mockResolvedValueOnce([mockedCustomer]);
    expect(await customerService.findAll()).toEqual([mockedCustomer]);
  });

  it('should return one customer info', async () => {
    const customerId = 1;
    const mockedCustomer: CustomerEntity = {
      id: 1,
      firstName: 'Katerine',
      lastName: 'Pyrton'
    };
    jest.spyOn(customerRepo, 'findOneOrFail').mockResolvedValueOnce(mockedCustomer);
    expect(await customerService.findOne(customerId)).toEqual(mockedCustomer);
  });
});
