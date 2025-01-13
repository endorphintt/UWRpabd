import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { User } from './users/users.model'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/roles.model'
import { UserRoles } from './roles/user-roles.model'
import { AuthModule } from './auth/auth.module'
import { ProductsModule } from './products/products.module'
import { OrdersModule } from './orders/orders.module'
import { BasketsModule } from './baskets/baskets.module'
import { Basket } from './baskets/baskets.model'
import { Product } from './products/products.model'
import { ProductImage } from './products/product_image.model'
import { BasketProduct } from './baskets/baskets_product.model'
import { OrderProducts } from './orders/order_products.model'
import { Order } from './orders/orders.model'
import { FilesModule } from './files/files.module'
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [
                User,
                Role,
                UserRoles,
                Basket,
                Product,
                ProductImage,
                BasketProduct,
                Order,
                OrderProducts,
            ],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProductsModule,
        OrdersModule,
        BasketsModule,
        FilesModule,
    ],
})
export class AppModule {}
