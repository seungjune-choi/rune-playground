import { HttpException } from '@libs/exceptions/http';
import { HttpStatus } from '@libs/enums';

export const httpExceptionFilter = (err: Error | HttpException, req, res, next) => {
  if (err instanceof Error) {
    if (err instanceof HttpException) {
      return res.status(err.status).json({
        message: err.message,
      });
    } else {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
      });
    }
  }
};
