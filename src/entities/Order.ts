import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { ValidateNested } from 'class-validator';
import { Customer } from './Customer';
import { OrderItems } from './OrderItems';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @ValidateNested()
  customer!: Customer;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: string;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  orderItems!: OrderItems[];

  total: number = 0;

  @AfterLoad()
  calculateTotal() {
    if (this.orderItems.length > 0) {
      const total = this.orderItems.reduce((acc: number, item: OrderItems) => {
        return acc + item.product.price * item.quantity;
      }, 0);
      this.total = Number.parseInt(total.toFixed(2));
    }
  }
}
