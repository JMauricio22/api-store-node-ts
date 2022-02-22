import { QueryParams } from './query.params';

export interface CreateProduct {
  name: string;
  description: string;
  image: string;
  price: number;
  categoryId: number;
}

export interface UpdateProduct extends Partial<CreateProduct> {}

export interface ProductQueryParams extends QueryParams {
  price?: number;
  minPrice?: number;
  maxPrice?: number;
}
