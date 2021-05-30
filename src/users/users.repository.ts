import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CredentialsDto } from 'src/auth/dto/credentialsDto.dto';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { email, name, password } = createUserDto;

    const user = this.create();
    user.email = email;
    user.userName = name;
    user.salt = await bcrypt.genSalt();
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  async checkCredentials(
    credentialsDto: CredentialsDto,
  ): Promise<Users | undefined> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email });

    const check = await user?.checkPassword(password);
    if (user && check) {
      return user;
    }

    return undefined;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
