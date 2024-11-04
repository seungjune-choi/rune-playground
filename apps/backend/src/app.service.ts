import { Injectable } from '@libs/decorators';

@Injectable()
export class AppService {
  public healthCheck(): string {
    return 'OK';
  }
}
