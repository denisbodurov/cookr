import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinColumn, ManyToMany, OneToOne} from 'typeorm';

@Entity('product')
export class ProductEntity {

  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({default: ''})
  product_name: string;

  @Column({default: ''})
  image: Blob;

  product_type: Enumerator;

//   @ManyToMany(type => ArticleEntity)
//   @JoinTable()
//   favorites: ArticleEntity[];

//   @OneToMany(type => ArticleEntity, article => article.author)
//   articles: ArticleEntity[];
}