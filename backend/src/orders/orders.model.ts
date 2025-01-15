import {
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { OrderProducts } from './order_products.model'
import { Product } from 'src/products/products.model'

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
    })
    id: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @Column({ type: DataType.INTEGER })
    totalPrice: number

    @Column({
        type: DataType.STRING,
        defaultValue: 'the order is being prepared for delivery',
    })
    status: string

    @Column({ type: DataType.STRING, allowNull: false })
    address: string

    @Column({ type: DataType.STRING, allowNull: false })
    phone: string

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @BelongsToMany(() => Product, () => OrderProducts)
    products: Product[]
}
