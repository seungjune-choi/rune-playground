import express from 'express';
import * as FxSQL from 'fxsql';

async function bootstrap() {
  const app = express();
  const pool = await FxSQL.PostgreSQL.CONNECT({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  });
  const { QUERY } = pool;

  app.get('/', async (req, res) => {
    const [{ now }] = await QUERY`SELECT NOW()`;
    res.send({
      now: now.toLocaleString(),
    });
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

bootstrap()
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });
