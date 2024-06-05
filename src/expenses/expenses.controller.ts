import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('expenses')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll(@Request() { user: { sub: email } }: any) {
    return this.expensesService.findAll(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user: { sub: email } }: any) {
    return this.expensesService.findOne(+id, email);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Request() { user: { sub: email } }: any,
  ) {
    return this.expensesService.update(+id, updateExpenseDto, email);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() { user: { sub: email } }) {
    return this.expensesService.remove(+id, email);
  }
}
