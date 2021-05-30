import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Women } from 'src/women/women.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'women_in_tech',
  entities: [Users, Women],
  synchronize: true,
  autoLoadEntities: true,
};
