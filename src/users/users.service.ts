import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async deleteUser(userId: number) {
    const result = await this.usersRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.usersRepository.createUser(createUserDto);
    }
  }

  async findUserById(userId: string): Promise<Users> {
    const user = await this.usersRepository.findOne(userId, {
      select: ['id', 'email', 'userName'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<Users> {
    const user = await this.findUserById(id);
    const { name, email } = updateUserDto;
    user.userName = name ? name : user.userName;
    user.email = email ? email : user.email;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }
}
