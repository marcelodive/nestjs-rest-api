import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import {
  ExpenseDoesNotExistsError,
  UserDoesNotExistsError,
} from 'src/common/custom-errors';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly usersService: UsersService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const user = await this.usersService.findByEmail(
      createExpenseDto.userEmail,
    );

    if (!user) throw new UserDoesNotExistsError(createExpenseDto.userEmail);

    return this.expenseRepository.save({
      description: createExpenseDto.description,
      price: createExpenseDto.price,
      dateOccurred: createExpenseDto.dateOccurred,
      user,
    });
  }

  findAll(userEmail: string): Promise<Expense[]> {
    return this.expenseRepository.find({
      where: {
        user: {
          email: userEmail,
        },
      },
    });
  }

  async findOne(id: number, userEmail: string): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: {
        id,
        user: {
          email: userEmail,
        },
      },
    });

    if (!expense) throw new ExpenseDoesNotExistsError(id);

    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
    userEmail: string,
  ): Promise<Expense> {
    const expenseToUpdate = await this.findOne(id, userEmail);
    Object.assign(expenseToUpdate, updateExpenseDto);
    return this.expenseRepository.save(expenseToUpdate);
  }

  async remove(id: number, userEmail: string): Promise<Expense> {
    const expenseToDelete = await this.findOne(id, userEmail);
    return this.expenseRepository.remove(expenseToDelete);
  }
}
