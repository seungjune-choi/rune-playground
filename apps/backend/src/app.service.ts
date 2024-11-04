import { Injectable } from '@libs/decorators';

@Injectable()
export class AppService {
  constructor() {
    console.log('AppService constructor');
  }
  public healthCheck(): string {
    return 'OK';
  }
}
