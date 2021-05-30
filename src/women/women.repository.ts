import { EntityRepository, Repository } from 'typeorm';
import { Women } from './women.entity';
import { CreateWomanDto } from './dto/create-woman.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Users } from 'src/users/users.entity';

@EntityRepository(Women)
export class WomanRepository extends Repository<Women> {
  async createWoman(
    createWomanDto: CreateWomanDto,
    user: Users,
  ): Promise<Women> {
    const {
      name,
      inventionName,
      inventionCreationDate,
      inventionDescription,
    } = createWomanDto;

    const woman = this.create();
    woman.womanName = name;
    woman.inventionName = inventionName;
    woman.inventionCreationDate = inventionCreationDate;
    woman.inventionDescription = inventionDescription;
    woman.user = user;
    try {
      await woman.save();
      delete woman.user;
      return woman;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o usuário no banco de dados',
      );
    }
  }
}
