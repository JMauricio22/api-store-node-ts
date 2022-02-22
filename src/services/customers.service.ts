import { getRepository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { User } from '../entities/User';
import Boom from '@hapi/boom';
import { CreateCustomer, UpdateCustomer } from '../types/customer.model';
import { validateOrReject } from 'class-validator';

class CustomerService {
  async find() {
    const customer = await getRepository(Customer).find({
      relations: ['user'],
    });

    return customer;
  }

  async create(body: CreateCustomer) {
    const user = new User(body.user.email, body.user.password);
    const customer = new Customer(
      body.firstName,
      body.lastName,
      body.phone,
      user
    );
    await validateOrReject(customer);
    const newCustomer = await getRepository(Customer).save(customer);
    return newCustomer;
  }

  async findOne(id: string) {
    const customer = await getRepository(Customer).findOne(id, {
      relations: ['user'],
    });
    if (!customer) {
      throw Boom.notFound();
    }

    return customer as Customer;
  }

  async update(id: string, body: UpdateCustomer) {
    const customer = await this.findOne(id);
    Object.keys(body).forEach((key: string) => {
      if (typeof body[key] === 'object') {
        Object.keys(body[key]).forEach((userKey: string) => {
          customer[key][userKey] = body[key][userKey];
        });
      } else {
        customer[key] = body[key];
      }
    });
    await validateOrReject(customer);
    const newCustomer = await getRepository(Customer).save(customer);
    return newCustomer;
  }

  async delete(id: string) {
    const customer = await this.findOne(id);
    const result = await getRepository(Customer).remove(customer);
    return result;
  }
}

export default CustomerService;
