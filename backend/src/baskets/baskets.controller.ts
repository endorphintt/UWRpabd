import { Body, Controller, Post } from '@nestjs/common'
import { BasketsService } from './baskets.service'
import { CreateBasketDto } from './dto/create-basket.dto'

@Controller('baskets')
export class BasketsController {
    constructor(private readonly basketsService: BasketsService) {}

    @Post()
    create(@Body() basketDto: CreateBasketDto) {
        return this.basketsService.create(basketDto)
    }
}
