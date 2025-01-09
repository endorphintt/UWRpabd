import { Module } from '@nestjs/common'
import { BasketsService } from './baskets.service'
import { BasketsController } from './baskets.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/users.model'
import { Basket } from './baskets.model'
import { Product } from 'src/products/products.model'
import { BasketProduct } from './baskets_product.model'

@Module({
    controllers: [BasketsController],
    providers: [BasketsService],
    imports: [
        SequelizeModule.forFeature([User, Basket, Product, BasketProduct]),
    ],
    exports: [BasketsService],
})
export class BasketsModule {}
