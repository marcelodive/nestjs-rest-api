import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoService } from '../crypto/crypto.service';
import { UserAlreadyExistsError } from '../common/custom-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
  ) {}

  async create({email, password}: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({email});
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    return this.userRepository.save({
      email,
      password: await this.cryptoService.hashPassword(password),
    })
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({email});
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
