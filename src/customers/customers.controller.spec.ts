import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';

describe('Customers Controller', () => {
  let customerController: CustomersController;
  let customerService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useClass: Repository,
        }]
    }).compile();

    customerController = module.get<CustomersController>(CustomersController);
    customerService = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(customerController).toBeDefined();
  });

  it('should return all customers', async () => {
    const mockedCustomers: CustomerEntity[] = [{
      id: 1,
      firstName: "Katerine",
      lastName: "Pyrton",
    }, {
      id: 2,
      firstName: "Lucilia",
      lastName: "Strasse",
    }];

    jest.spyOn(customerService, 'findAll').mockResolvedValueOnce(mockedCustomers);
    expect(await customerController.findAll()).toEqual(mockedCustomers);
  });

  it('should return one customer', async () => {
    const mockedCustomer: CustomerEntity = {
      id: 1,
      firstName: "Katerine",
      lastName: "Pyrton",
    };

    jest.spyOn(customerService, 'findOne').mockResolvedValueOnce(mockedCustomer);
    expect(await customerController.findOne(1)).toEqual(mockedCustomer);
  });
});
