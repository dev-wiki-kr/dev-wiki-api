import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const environment = process.env.NODE_ENV || 'development';
const env = dotenv.parse(fs.readFileSync(`.env.${environment}`));

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: +env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['dist/**/entities/*.entity.{js,ts}'],
  synchronize: env.DB_SYNCHRONIZE === 'true',
  migrations: ['dist/**/migrations/*.js'],
  migrationsTableName: 'migrations',
});
