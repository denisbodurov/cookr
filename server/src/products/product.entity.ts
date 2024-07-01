import { ProductTypeEntity } from 'src/product_type/product_type.entity';
import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinColumn, ManyToMany, OneToOne} from 'typeorm';

@Entity('product')
export class ProductEntity {

  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({default: ''})
  product_name: string;

  @Column({default: ''})
  image: Blob;

  @OneToOne(() => ProductTypeEntity, (product_type) => product_type.product_id)
  @JoinColumn()
  product_type_id: number;

//   @ManyToMany(type => ArticleEntity)
//   @JoinTable()
//   favorites: ArticleEntity[];

//   @OneToMany(type => ArticleEntity, article => article.author)
//   articles: ArticleEntity[];
}