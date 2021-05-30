import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), PassportModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [TypeOrmModule, PassportModule],
})
export class UsersModule {}
