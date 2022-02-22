import { getRepository } from 'typeorm';
import { Category } from '../entities/Category';
import Boom from '@hapi/boom';
import { CreateCategory, UpdateCategory } from '../types/category.model';
import { validateOrReject } from 'class-validator';

class CustomerService {
  async find() {
    const category = await getRepository(Category).find();
    return category;
  }

  async create(body: CreateCategory) {
    const category = new Category();
    category.name = body.name;
    await validateOrReject(category);
    const newCategory = await getRepository(Category).save(category);
    return newCategory;
  }

  async findOne(id: string) {
    const category = await getRepository(Category).findOne(id);
    if (!category) {
      throw Boom.notFound();
    }
    return category;
  }

  async update(id: string, body: UpdateCategory) {
    const category = await this.findOne(id);
    Object.keys(body).forEach((key: string) => {
      category[key] = body[key];
    });
    const updatedCategory = await getRepository(Category).save(category);
    return updatedCategory;
  }

  async delete(id: string) {
    const category = await this.findOne(id);
    const removedCategory = await getRepository(Category).remove(category);
    return removedCategory;
  }
}

export default CustomerService;
