import 'reflect-metadata';
import express, { Express } from 'express';
import { appRouter } from '@libs/appRouter';
import { DATA_SOURCE, DataSource } from '@libs/database';
import { container } from 'tsyringe';

async function bootstrap() {
  const app = express();
  await initialize(app);
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

async function initialize(app: Express) {
  // set up database connection
  const dataSource = new DataSource({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  });

  await dataSource.$connect();

  // inject db instance to container
  container.register(DATA_SOURCE, { useValue: dataSource });

  // import controllers
  require('./app.controller');
  require('./presentation');
  // set up router
  app.use(appRouter);

}

bootstrap()
  .then(() => {
    console.log('mini marpple is started');
  })
  .catch(console.error);
