import { IsNotEmpty, Max, Min } from "class-validator";

export class CreateRatingDto {
    @IsNotEmpty()
    description: string;

    @Min(1)
    @Max(5)
    rating: number;
}
  