import { HttpStatus } from '@libs/enums';

export class HttpException extends Error {
  constructor(
    private readonly _status: HttpStatus,
    message?: string,
  ) {
    super(message);
  }

  get status() {
    return this._status;
  }
}
