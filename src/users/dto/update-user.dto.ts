import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  email: string;
}
