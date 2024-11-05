import { Inject, Injectable } from '@libs/decorators';
import { DATA_SOURCE, DataSource } from '@libs/database';

@Injectable()
export class UserRepository {
  constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {}

  public exists(email: string, password: string): Promise<boolean> {
    return this.dataSource.$query<{ id: number }>`
      SELECT 
        id
      FROM
        users
      WHERE
        email = ${email} AND 
        password = ${password}
    `.then((result) => result.length > 0);
  }
}