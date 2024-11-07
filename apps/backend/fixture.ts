import { DataSource } from './libs/database';

export const testDataSource = new DataSource({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
});
