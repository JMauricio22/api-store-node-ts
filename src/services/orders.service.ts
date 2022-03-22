import { getRepository } from 'typeorm';
import { Order } from '../entities/Order';
import { Customer } from '../entities/Customer';
import { Product } from '../entities/Product';
import { OrderItems } from '../entities/OrderItems';
import Boom from '@hapi/boom';
import { CreateOrder, AddItem, User } from '../types/order.model';
import { validateOrReject } from 'class-validator';

class CustomerService {
  private isValidEntity<T>(
    id: number,
    entity: T | undefined,
    entityName: string
  ) {
    if (!entity) {
      throw Boom.badData(`${entityName} with id ${id} does not exist`);
    }
  }

  async find() {
    const orders = await getRepository(Order).find({
      relations: [
        'customer',
        'customer.user',
        'orderItems',
        'orderItems.product',
      ],
    });
    return orders;
  }

  async findOrderByUserId(user: User) {
    const customer = await getRepository(Customer).findOne({
      where: {
        user: {
          id: user.userId,
        },
      },
    });
    if (!customer) {
      throw Boom.notFound(`User with id ${user.userId} is not a customer`);
    }
    const orders = await getRepository(Order).find({
      where: {
        customer: {
          id: customer.id,
        },
      },
      relations: ['orderItems', 'orderItems.product'],
    });
    return orders;
  }

  async create(body: CreateOrder) {
    const order = new Order();
    const customer = await getRepository(Customer).findOne({
      where: {
        user: {
          id: body.userId,
        },
      },
    });
    if (!customer) {
      throw Boom.badData(`The user with id ${body.userId} is not a customer`);
    }
    order.customer = customer;
    await validateOrReject(order);
    const newOrder = await getRepository(Order).save(order);
    return newOrder;
  }

  async addItemToOrder(body: AddItem) {
    const order = await getRepository(Order).findOne(body.orderId);
    this.isValidEntity<Order>(body.orderId, order, 'Order');
    const product = await getRepository(Product).findOne(body.productId);
    this.isValidEntity<Product>(body.productId, product, 'Product');
    const items = new OrderItems();
    items.order = order as Order;
    items.product = product as Product;
    items.quantity = body.quantity;
    const newOrderItems = await getRepository(OrderItems).save(items);
    return newOrderItems;
  }

  async findOne(id: string) {
    const order = await getRepository(Order).findOne(id);
    if (!order) {
      throw Boom.notFound();
    }
    return order;
  }

  async delete(id: string) {
    const order = await this.findOne(id);
    const removedOrder = await getRepository(Order).remove(order);
    return removedOrder;
  }
}

export default CustomerService;
