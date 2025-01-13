import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Product } from 'src/products/products.model'
import { Order } from './orders.model'
import { OrderProducts } from './order_products.model'
import { ProductsModule } from 'src/products/products.module'
import { BasketsModule } from 'src/baskets/baskets.module'
import { Basket } from 'src/baskets/baskets.model'
import { BasketProduct } from 'src/baskets/baskets_product.model'

@Module({
    controllers: [OrdersController],
    providers: [OrdersService],
    imports: [
        ProductsModule,
        BasketsModule,
        SequelizeModule.forFeature([
            Order,
            OrderProducts,
            Basket,
            BasketProduct,
            Product,
        ]),
    ],
})
export class OrdersModule {}
