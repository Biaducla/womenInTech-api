import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { Repository } from 'typeorm';
import { CreateWomanDto } from './dto/create-woman.dto';
import { Women } from './women.entity';
import { WomanRepository } from './women.repository';

@Injectable()
export class WomenService {
  constructor(
    @InjectRepository(WomanRepository)
    private womanRepository: WomanRepository,

    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  findAll(): Promise<Women[]> {
    return this.womanRepository.find();
  }

  async findWomanById(id: number): Promise<Women> {
    const woman = await this.womanRepository.findOne(id, {
      select: ['id', 'womanName'],
    });

    if (!woman) throw new NotFoundException('Usuário não encontrado');

    return woman;
  }

  async deleteWoman(womanId: number): Promise<void> {
    const result = await this.womanRepository.delete({ id: womanId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async create(createWomanDto: CreateWomanDto, user: Users): Promise<Women> {
    const findUser = await this.userRepository.find({ email: user.email });
    return this.womanRepository.createWoman(createWomanDto, findUser[0]);
  }
}
