import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BeforeInsert,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { Customer } from './Customer';
import bcrypt from 'bcrypt';

@Entity()
export class User {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  id!: number;

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
