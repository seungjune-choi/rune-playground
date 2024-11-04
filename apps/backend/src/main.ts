import 'reflect-metadata';
import express from 'express';
import { appRouter } from '@libs/appRouter';

require('./app.controller');

function bootstrap() {
  const app = express();
  app.use(appRouter);
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

bootstrap();
