import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => Product)
  product!: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order!: Order;
}
