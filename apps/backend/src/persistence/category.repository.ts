import { Inject, Injectable } from '@libs/decorators';
import { Category } from '@backend/models';
import { DATA_SOURCE, DataSource } from '@libs/database';
import { map, pipe, take, toArray } from '@fxts/core';
import { toCamelDeep } from '@libs/utils/keys-to-camel';
import { DeepSnakeCase } from '@libs/types/case';

@Injectable()
export class CategoryRepository {
  constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {}

  save = (category: Pick<Category, 'name'>): Promise<Category> =>
    pipe(
      this.dataSource.$query<DeepSnakeCase<Category>>`
        INSERT INTO categories 
          ${this.dataSource.$values(category)} 
        RETURNING *
    `,
      take(1),
      map((row) => toCamelDeep(row)),
      toArray,
    ).then(([category]) => category);
}
