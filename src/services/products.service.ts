import { getRepository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import Boom from '@hapi/boom';
import { Product } from '../entities/Product';
import {
  CreateProduct,
  UpdateProduct,
  ProductQueryParams,
} from '../types/product.model';
import { Category } from '../entities/Category';

class ProductsService {
  async find(query: ProductQueryParams) {
    let queryBuilder = await getRepository(Product)
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category');

    if (query.limit && query.offset) {
      queryBuilder = queryBuilder.limit(query.limit).offset(query.offset);
    }

    if (query.price && !query.minPrice && !query.maxPrice) {
      queryBuilder = queryBuilder.where('product.price = :price', {
        price: query.price,
      });
    }

    if (query.minPrice) {
      queryBuilder = queryBuilder.where('product.price >= :minPrice', {
        minPrice: query.minPrice,
      });

      if (query.maxPrice) {
        queryBuilder = queryBuilder.andWhere('product.price <= :maxPrice', {
          maxPrice: query.maxPrice,
        });
      }
    }

    const products = await queryBuilder.getMany();
    return products;
  }

  async findOne(id: string) {
    const product = await getRepository(Product).findOne(id);
    if (!product) {
      throw Boom.notFound();
    }
    return product;
  }

  async create(body: CreateProduct) {
    const product = new Product();
    product.name = body.name;
    product.description = body.description;
    product.image = body.image;
    product.price = body.price;
    const category = await getRepository(Category).findOne(body.categoryId);
    if (!category) {
      throw Boom.badData(`Category with id ${body.categoryId} does not exist`);
    }
    product.category = category;
    const newProduct = await getRepository(Product).save(product);
    return newProduct;
  }

  async update(id: string, body: UpdateProduct) {}

  async delete(id: string) {
    const product = await this.findOne(id);
    const result = await getRepository(Product).remove(product);
    return result;
  }
}

export default ProductsService;
