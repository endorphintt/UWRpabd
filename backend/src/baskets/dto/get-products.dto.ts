import { IsInt, IsPositive } from 'class-validator'

export class GetProductsDto {
    @IsInt()
    @IsPositive()
    userId: number
}
