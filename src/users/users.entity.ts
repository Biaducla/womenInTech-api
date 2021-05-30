import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty } from 'class-validator';
import { Logger } from '@nestjs/common';

@Entity()
@Unique(['id'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @IsNotEmpty({ message: 'O nome do usuário é obrigatório' })
  userName: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  password?: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar' })
  salt?: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt ? this.salt : '');
    return hash === this.password;
  }
}
