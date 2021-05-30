import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { WomenController } from './women.controller';
import { WomanRepository } from './women.repository';
import { WomenService } from './women.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WomanRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
  ],
  exports: [TypeOrmModule],
  controllers: [WomenController],
  providers: [WomenService],
})
export class WomenModule {}
