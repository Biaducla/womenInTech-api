import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { CreateWomanDto } from './dto/create-woman.dto';
import { ReturnWomanDto } from './dto/return-woman.dto';
import { Women } from './women.entity';
import { WomenService } from './women.service';

@Controller('/women')
export class WomenController {
  constructor(private womenService: WomenService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createWomen(
    @Body() womenCreated: CreateWomanDto,
    @GetUser() user: Users,
  ) {
    const womenAdded = await this.womenService.create(womenCreated, user);
    return { womenAdded, message: 'Cientista adicionada com sucesso!' };
  }

  @Get(':id')
  async findWomanById(@Param() id: number): Promise<ReturnWomanDto> {
    const woman = await this.womenService.findWomanById(id);
    return {
      woman,
      message: 'Cientista encontrada',
    };
  }

  @Get()
  public findAllWomen(): Promise<Women[]> {
    return this.womenService.findAll();
  }

  @Delete(':id')
  public async removeWomen(@Param() id: number) {
    await this.womenService.deleteWoman(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
