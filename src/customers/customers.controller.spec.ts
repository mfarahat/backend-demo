import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomersPurchasesRepository } from './customers-purchases.repository';
import { CustomerPurchases } from './interfaces/customer-total-purchases.interface';

describe('Customers Controller', () => {
  let customerController: CustomersController;
  let customerService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CustomersPurchasesRepository),
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
    const mockedCustomers: Customer[] = [{
      id: 1,
      firstName: "Katerine",
      lastName: "Pyrton",
      purchases: []
    }, {
      id: 2,
      firstName: "Lucilia",
      lastName: "Strasse",
      purchases: []
    }];

    jest.spyOn(customerService, 'findAll').mockResolvedValueOnce(mockedCustomers);
    expect(await customerController.findAll()).toEqual(mockedCustomers);
  });

  it('should return all customers with their purchases', async () => {
    const mockedCustomersPurchases: CustomerPurchases[] = [{
      id: 1,
      firstName: "Katerine",
      lastName: "Pyrton",
      purchasesCount: 10,
      purchasesTotalValue: 10
    }, {
      id: 2,
      firstName: "Lucilia",
      lastName: "Strasse",
      purchasesCount: 10,
      purchasesTotalValue: 10
    }];

    jest.spyOn(customerService, 'findAllWithPurchases').mockResolvedValueOnce(mockedCustomersPurchases);
    expect(await customerController.findAllWPurchases()).toEqual(mockedCustomersPurchases);
  });

  it('should return one customer', async () => {
    const mockedCustomer: Customer = {
      id: 1,
      firstName: "Katerine",
      lastName: "Pyrton",
      purchases: []
    };

    jest.spyOn(customerService, 'findOne').mockResolvedValueOnce(mockedCustomer);
    expect(await customerController.findOne(1)).toEqual(mockedCustomer);
  });
});
