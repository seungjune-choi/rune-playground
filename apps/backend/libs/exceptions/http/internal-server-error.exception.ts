import { HttpException } from '@libs/exceptions/http/http.exception';
import { HttpStatus } from '@libs/enums';

export class InternalServerErrorException extends HttpException {
  constructor(message?: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message ?? 'Internal Server Error');
  }
}
