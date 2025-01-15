import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { Order } from './orders.model'
import { Product } from 'src/products/products.model'

@Table({ tableName: 'order_products', updatedAt: false, createdAt: false })
export class OrderProducts extends Model<OrderProducts> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
    })
    id: number

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    orderId: number

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number

    @Column({ type: DataType.INTEGER })
    price_at_order: number

    @Column({ type: DataType.INTEGER })
    quantity: number
}
