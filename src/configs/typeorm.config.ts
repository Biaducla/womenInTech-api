import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'women_in_tech',
  entities: [Users],
  synchronize: true,
  autoLoadEntities: true,
};
