import { IsNotEmpty } from 'class-validator';
import { Entity } from "typeorm"

@Entity()
export class CreateRecipeDto {
    id: number
    name: string
    description: string
    filename: string
    views: number
    isPublished: boolean
}