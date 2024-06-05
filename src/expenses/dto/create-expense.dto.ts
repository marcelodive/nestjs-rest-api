import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNumber, IsPositive, Length } from 'class-validator';
import { IsNotFutureDate } from 'src/validators/not-future-date.validator';

export class CreateExpenseDto {
  @Length(1, 191)
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsDate()
  @Type(() => Date)
  @IsNotFutureDate()
  dateOccurred: Date;

  @IsEmail()
  userEmail: string;
}
