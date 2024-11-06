import { HttpException } from '@libs/exceptions/http';
import { HttpStatus } from '@libs/enums';

export const httpExceptionFilter = (err: Error | HttpException, req, res, next) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      message: err.message,
    });
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  }
};
