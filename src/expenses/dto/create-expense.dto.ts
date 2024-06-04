import { IsNumber, Length } from "class-validator";

export class CreateExpenseDto {
    @Length(1, 191)
    description: string;

    @IsNumber()
    price: number;
}
