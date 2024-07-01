import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToOne, JoinColumn} from 'typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('recipe')
export class RecipeEntity {

  @PrimaryGeneratedColumn()
  recipe_id: number;


  @OneToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn()
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