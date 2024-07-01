import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import * as argon2 from 'argon2';

@Entity('recipe')
export class RecipeEntity {

  @PrimaryGeneratedColumn()
  recipe_id: number;

  @Column()
  author_id: number;

  @Column({default: ''})
  steps: string;

  @Column({default: ''})
  image: Blob;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

//   @ManyToMany(type => ArticleEntity)
//   @JoinTable()
//   favorites: ArticleEntity[];

//   @OneToMany(type => ArticleEntity, article => article.author)
//   articles: ArticleEntity[];
}