import { BaseEntity } from '@backend/entities/base.entity';
import { Expose } from 'class-transformer';

export class Product extends BaseEntity<number> {
  @Expose({ name: 'category_id' })
  categoryId!: number;

  @Expose({ name: 'name' })
  name!: string;

  @Expose({ name: 'description' })
  description!: string;

  @Expose({ name: 'price' })
  price!: number;

  @Expose({ name: 'stock_quantity' })
  stockQuantity!: number;

  @Expose({ name: 'hidden' })
  hidden!: boolean;

  constructor(data: Partial<Product>) {
    super();
    Object.assign(this, data);
  }

  static new(args: Pick<Product, 'categoryId' | 'name' | 'description' | 'price' | 'stockQuantity' | 'hidden'>) {
    return new Product(args);
  }
}
