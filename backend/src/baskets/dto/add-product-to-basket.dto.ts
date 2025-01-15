import { IsInt, IsPositive } from 'class-validator'

export class AddProductToBasketDto {
    @IsInt()
    @IsPositive()
    basketId: number

    @IsInt()
    @IsPositive()
    productId: number

    @IsInt()
    @IsPositive()
    quantity: number
}
