import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

    async signIn(
        email: string,
        pass: string,
      ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        if (user?.password !== pass) { // TODO: Use crypto
          throw new UnauthorizedException();
        }
        const payload = { sub: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
