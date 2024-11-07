import { IsBoolean, IsInt, IsString, Length, Max, Min } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Product } from '@backend/entities';

export class CreateProductRequest {
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  categoryId!: number;

  @IsString()
  @Length(1, 255)
  name!: string;

  @IsString()
  @Length(1, 1000)
  description!: string;

  @IsInt()
  @Min(1000)
  @Max(100_000_000)
  price!: number;

  @IsBoolean()
  hidden!: boolean;

  @IsInt()
  @Min(0)
  stockQuantity!: number;

  @Exclude()
  toEntity() {
    return Product.new({ ...this });
  }
}
