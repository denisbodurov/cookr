import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToOne, Unique} from 'typeorm';
import { ProductEntity } from 'src/products/product.entity';

@Entity('product_type')
@Unique(['product_type_name'])
export class ProductTypeEntity {

  @PrimaryGeneratedColumn()
  @OneToOne(() => ProductEntity, (product) => product.product_type_id)
  product_id: number;

  @Column()
  product_type_name: string;
}