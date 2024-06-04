import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

    async signIn(
        email: string,
        password: string,
      ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        const isAPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isAPasswordMatch) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
