import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript'
import { ProductImage } from './product_image.model'
import { Basket } from 'src/baskets/baskets.model'
import { BasketProduct } from 'src/baskets/baskets_product.model'
import { Order } from 'src/orders/orders.model'
import { OrderProducts } from 'src/orders/order_products.model'

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        type: DataType.INTEGER,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number

    @HasMany(() => ProductImage)
    images: [ProductImage]

    @BelongsToMany(() => Basket, () => BasketProduct)
    baskets: Basket[]

    @BelongsToMany(() => Order, () => OrderProducts)
    orders: Order[]
}
