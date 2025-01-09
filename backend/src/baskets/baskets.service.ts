import { InjectModel } from '@nestjs/sequelize'
import { Injectable } from '@nestjs/common'
import { Basket } from './baskets.model'
import { CreateBasketDto } from './dto/create-basket.dto'

@Injectable()
export class BasketsService {
    constructor(@InjectModel(Basket) private basketRepository: typeof Basket) {}

    async create(dto: CreateBasketDto) {
        const basket = await this.basketRepository.create(dto)
        return basket
    }
}
