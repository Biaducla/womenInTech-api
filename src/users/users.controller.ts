import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './users.entity';
import { UserService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.userService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Get()
  public findAllUsers(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.userService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }

  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return this.userService.updateUser(updateUserDto, id);
  }
}
