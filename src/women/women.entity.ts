import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Users } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Women extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @IsNotEmpty({ message: 'O nome da inventora é obrigatório' })
  @IsString()
  womanName: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @IsNotEmpty({ message: 'O nome da invenção é obrigatório' })
  inventionName: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @IsNotEmpty({ message: 'A descrição da invenção é obrigatória' })
  inventionDescription: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @IsNotEmpty({ message: 'A data de criação é obrigatória' })
  @IsDateString()
  inventionCreationDate: string;

  @ManyToOne(() => Users, (author: Users) => author.id)
  user?: Users;
}
