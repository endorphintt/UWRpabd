import { IsInt, IsPositive } from 'class-validator'

export class RemoveProductFromBasketDto {
    @IsInt()
    @IsPositive()
    basketId: number

    @IsInt()
    @IsPositive()
    productId: number
}
