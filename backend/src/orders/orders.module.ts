import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Product } from 'src/products/products.model'
import { Order } from './orders.model'
import { OrderProducts } from './order_products.model'

@Module({
    controllers: [OrdersController],
    providers: [OrdersService],
    // imports: [SequelizeModule.forFeature([Product, Order, OrderProducts])],
})
export class OrdersModule {}
