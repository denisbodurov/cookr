import { Expose } from 'class-transformer';

export class AuthorDto {
  @Expose()
  user_id: number;

  @Expose()
  username: string;

  @Expose()
  image: string;
}