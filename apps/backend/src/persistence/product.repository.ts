import { Inject, Injectable } from '@libs/decorators';
import { DATA_SOURCE, DataSource, TransactionClient } from '@libs/database';
import { map, pipe, take, toArray } from '@fxts/core';
import { ProductScheme } from '@backend/persistence/scheme';
import { Product } from '@backend/entities';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class ProductRepository {
  constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {}

  /**
   * upsert product
   * @description
   * - if product.id is not set, insert new product and return it
   * - if product.id is set, update product and return it
   */
  save = (product: Product, tx?: TransactionClient): Promise<Product> =>
    product.id ? this.update(product, tx) : this.create(product, tx);

  /**
   * update product
   * @description
   * - update product by id and return it
   */
  update = (product: Product, tx?: TransactionClient): Promise<Product> =>
    pipe(
      (tx ?? this.dataSource).$query<ProductScheme>`
        UPDATE products 
          ${this.dataSource.$set(this.#productToPlain(product))} 
        WHERE 
          id = ${product.id} 
        RETURNING *`,
      take(1),
      map(this.#plainToProduct),
      toArray,
    ).then(([product]) => product);

  /**
   * create product
   * @description
   * - insert new product and return it
   */
  create = (product: Product, tx?: TransactionClient): Promise<Product> =>
    pipe(
      (tx ?? this.dataSource).$query<ProductScheme>`
        INSERT INTO products
          ${this.dataSource.$values(this.#productToPlain(product))}
        RETURNING *`,
      take(1),
      map(this.#plainToProduct),
      toArray,
    ).then(([product]) => product);

  #plainToProduct = (scheme: ProductScheme) => plainToInstance(Product, scheme);
  #productToPlain = (product: Product) => instanceToPlain(product, { exposeUnsetFields: false });
}
