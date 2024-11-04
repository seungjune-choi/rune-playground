import express from 'express';

function bootstrap() {
  const app = express();
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });

  app.get('/', (req, res) => {
    res.send('Hello World');
  });
}

bootstrap();
