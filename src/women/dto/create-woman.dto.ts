import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateWomanDto {
  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe o nome da invenção',
  })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  inventionName: string;

  @IsNotEmpty({
    message: 'Informe a descrição da invenção',
  })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  inventionDescription: string;

  @IsNotEmpty({
    message: 'Informe a data da criação da invenção',
  })
  inventionCreationDate: string;
}
