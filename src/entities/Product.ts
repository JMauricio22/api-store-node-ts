import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ValidateNested } from 'class-validator';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('character varying')
  name!: string;

  @Column('character varying')
  description!: string;

  @Column('character varying')
  image!: string;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
  })
  price!: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @ValidateNested()
  category!: Category;
}
