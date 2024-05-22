import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'dev-wiki',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
