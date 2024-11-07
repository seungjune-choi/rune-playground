import { Body, Controller, Post, UseMiddleware } from '@libs/decorators';
import { ProductService } from '@backend/usecase';
import { CreateProductRequest } from '@backend/presentation/dto';
import { BodyValidator } from '@libs/middlewares';
import { ResponseEntity } from '@libs/rest';

@Controller('/products/v1')
export class ProductControllerV1 {
  constructor(private readonly productService: ProductService) {}

  @UseMiddleware(BodyValidator(CreateProductRequest))
  @Post()
  async create(@Body() request: CreateProductRequest) {
    return await this.productService.create(request.toEntity()).then(ResponseEntity.created);
  }
}
