import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Product } from './products.model'
import { ProductImage } from './product_image.model'
import { Basket } from 'src/baskets/baskets.model'
import { BasketProduct } from 'src/baskets/baskets_product.model'
import { Order } from 'src/orders/orders.model'
import { OrderProducts } from 'src/orders/order_products.model'

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        SequelizeModule.forFeature([
            Product,
            ProductImage,
            Basket,
            BasketProduct,
            // Order,
            // OrderProducts,
        ]),
    ],
})
export class ProductsModule {}
