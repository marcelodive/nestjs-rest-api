import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAlreadyExistsError } from '../common/custom-errors';
import { CryptoService } from '../crypto/crypto.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let cryptoService: CryptoService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker(() => createMock())
      .compile();

    usersService = module.get<UsersService>(UsersService);
    cryptoService = module.get<CryptoService>(CryptoService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create an user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'email@email.com',
        password: 'password',
      };
      const createdUser = new User();
      createdUser.email = createUserDto.email;
      createdUser.password = createUserDto.password;

      const findOneBySpy = jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue(null);
      const saveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(createdUser);
      const cryptoSpy = jest
        .spyOn(cryptoService, 'hashPassword')
        .mockResolvedValue('password');

      expect(await usersService.create(createUserDto)).toEqual(createdUser);
      expect(findOneBySpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();
      expect(cryptoSpy).toHaveBeenCalled();
    });

    it('should throw an UserAlreadyExistsError', async () => {
      const findOneBySpy = jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue(new User());
      const saveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(null);

      await expect(usersService.create(new User())).rejects.toThrow(
        UserAlreadyExistsError,
      );
      expect(findOneBySpy).toHaveBeenCalled();
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'email@email.com';

      const findOneBySpy = jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue(new User());

      expect(await usersService.findByEmail(email)).toEqual(new User());
      expect(findOneBySpy).toHaveBeenCalled();
    });
  });
});
