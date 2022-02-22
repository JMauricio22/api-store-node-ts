import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Order } from './Order';
import { ValidateNested } from 'class-validator';

@Entity()
export class Customer {
  constructor(firstName: string, lastName: string, phone: string, user: User) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('character varying')
  firstName!: string;

  @Column('character varying')
  lastName!: string;

  @Column('character varying')
  phone!: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  @ValidateNested()
  user!: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders!: Order[];
}
