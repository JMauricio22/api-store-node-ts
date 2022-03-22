import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BeforeInsert,
  Check,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { Customer } from './Customer';
import bcrypt from 'bcrypt';

@Entity()
@Check("role in ('admin', 'customer', 'seller')")
export class User {
  constructor(email: string, password: string, role: string) {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: 'customer',
  })
  role!: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email!: string;

  @Column()
  @Length(8)
  password?: string;

  @OneToOne(() => Customer, (customer) => customer.user)
  profile!: Customer;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
  }
}
