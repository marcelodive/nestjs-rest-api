import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { User } from '../users/entities/user.entity';
import { UserDoesNotExistsError } from '../common/custom-errors';

describe('ExpensesService', () => {
  let expensesService: ExpensesService;
  let expenseRepository: Repository<Expense>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpensesService],
    })
      .useMocker(() => createMock())
      .compile();

    expensesService = module.get<ExpensesService>(ExpensesService);
    expenseRepository = module.get<Repository<Expense>>(
      getRepositoryToken(Expense),
    );
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(expensesService).toBeDefined();
  });

  describe('create', () => {
    it('should create an expense', async () => {
      const createExpenseDto: CreateExpenseDto = {
        description: 'minor description',
        price: 25.22,
        dateOccurred: new Date(),
        userEmail: 'email@email.com',
      };

      const createdExpense = new Expense();
      createdExpense.description = createExpenseDto.description;
      createdExpense.price = createExpenseDto.price;
      createdExpense.dateOccurred = createExpenseDto.dateOccurred;

      const findOneBySpy = jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValue(new User());
      const saveSpy = jest
        .spyOn(expenseRepository, 'save')
        .mockResolvedValue(createdExpense);

      expect(await expensesService.create(createExpenseDto)).toEqual(
        createdExpense,
      );
      expect(findOneBySpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();
    });

    it('should throw an UserDoesNotExistsError', async () => {
      const createExpenseDto: CreateExpenseDto = {
        description: 'minor description',
        price: 25.22,
        dateOccurred: new Date(),
        userEmail: 'email@email.com',
      };

      const findOneBySpy = jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValue(null);
      const saveSpy = jest
        .spyOn(expenseRepository, 'save')
        .mockResolvedValue(null);

      await expect(expensesService.create(createExpenseDto)).rejects.toThrow(
        UserDoesNotExistsError,
      );
      expect(findOneBySpy).toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });
});
