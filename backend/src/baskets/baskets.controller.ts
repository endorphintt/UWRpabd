import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { BasketsService } from './baskets.service'
import { CreateBasketDto } from './dto/create-basket.dto'
import { AddProductToBasketDto } from './dto/add-product-to-basket.dto'
import { RemoveProductFromBasketDto } from './dto/remove-product-from-basket.dto'
import { GetProductsDto } from './dto/get-products.dto'

@Controller('baskets')
export class BasketsController {
    constructor(private readonly basketsService: BasketsService) {}

    @Post()
    create(@Body() basketDto: CreateBasketDto) {
        return this.basketsService.create(basketDto)
    }

    @Post('add-product')
    async addProductToBasket(@Body() addProductDto: AddProductToBasketDto) {
        return this.basketsService.addProductToBasket(addProductDto)
    }

    @Delete('remove-product')
    async removeProductFromBasket(
        @Body() removeProductDto: RemoveProductFromBasketDto
    ) {
        return this.basketsService.removeProductFromBasket(removeProductDto)
    }

    @Get('products')
    async getProducts(@Body() getProductsDto: GetProductsDto) {
        return this.basketsService.getProductsInBasket(getProductsDto)
    }

    @Post('increase-product')
    async increaseProductQuantity(
        @Body() addProductDto: AddProductToBasketDto
    ) {
        return this.basketsService.increaseProductQuantity(addProductDto)
    }

    @Post('decrease-product')
    async decreaseProductQuantity(
        @Body() addProductDto: AddProductToBasketDto
    ) {
        return this.basketsService.decreaseProductQuantity(addProductDto)
    }
}
