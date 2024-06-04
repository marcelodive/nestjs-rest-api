// src/common/errors/user-already-exists.error.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super('A user with this email already exists', HttpStatus.CONFLICT);
  }
}