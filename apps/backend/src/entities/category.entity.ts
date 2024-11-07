import { Expose } from 'class-transformer';
import { BaseEntity } from '@backend/entities/base.entity';

export class Category extends BaseEntity<number> {
  @Expose({ name: 'name' })
  name!: string;

  constructor(data: Partial<Category>) {
    super();
    Object.assign(this, data);
  }

  static new(args: Pick<Category, 'name'>) {
    return new Category(args);
  }
}
