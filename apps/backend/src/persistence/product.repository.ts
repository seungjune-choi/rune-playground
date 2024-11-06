import { Inject, Injectable } from '@libs/decorators';
import { DATA_SOURCE, DataSource } from '@libs/database';
import { Product } from '@backend/models';
import { map, pipe, take, toArray } from '@fxts/core';
import { DeepSnakeCase } from '@libs/types/case';
import { toCamelDeep } from '@libs/utils/keys-to-camel';

@Injectable()
export class ProductRepository {
  constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {}

  save = (product: Pick<Product, 'name' | 'description' | 'price'>): Promise<Product> =>
    pipe(
      this.dataSource.$query<DeepSnakeCase<Product>>`
        INSERT INTO products
          ${this.dataSource.$values(product)}
        RETURNING *
      `,
      take(1),
      map(toCamelDeep),
      toArray,
    ).then(([product]) => product);
}
