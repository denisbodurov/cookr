import { IsNotEmpty } from 'class-validator';
import { Entity } from "typeorm"

@Entity()
export class CreateRecipeDto {
    user_id: number
    recipe_description: string
    recipe_name: string
    views: number
    isPublished: boolean
}