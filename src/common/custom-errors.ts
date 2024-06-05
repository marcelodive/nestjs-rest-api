import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super('A user with this email already exists', HttpStatus.CONFLICT);
  }
}

export class UserDoesNotExistsError extends HttpException {
  constructor(email: string) {
    super(
      `An user with the email "${email}" does not exists`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ExpenseDoesNotExistsError extends HttpException {
  constructor(id: number) {
    super(
      `An expense with the id "${id}" does not exists`,
      HttpStatus.NOT_FOUND,
    );
  }
}
