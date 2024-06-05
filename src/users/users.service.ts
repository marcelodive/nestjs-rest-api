import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAlreadyExistsError } from '../common/custom-errors';
import { CryptoService } from '../crypto/crypto.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
  ) {}

  async create({ email, password }: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    return this.userRepository.save({
      email,
      password: await this.cryptoService.hashPassword(password),
    });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
