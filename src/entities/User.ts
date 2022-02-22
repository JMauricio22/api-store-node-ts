import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { Customer } from './Customer';

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
  password!: string;

  @OneToOne(() => Customer, (customer) => customer.user)
  profile!: Customer;
}
