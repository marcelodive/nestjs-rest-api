import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { User } from './users/entities/user.entity';
import { ExpensesModule } from './expenses/expenses.module';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from './crypto/crypto.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA,
        autoLoadEntities: true,
        synchronize: process.env.DB_SCHEMA === 'local',
      // })
    }),
    AuthModule,
    UsersModule,
    ExpensesModule,
    JwtModule.register({
      // inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      // })
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
