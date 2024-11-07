import { Injectable } from '@libs/decorators';
import { ProductRepository } from '@backend/persistence';
import { Product } from 'src/entities';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
