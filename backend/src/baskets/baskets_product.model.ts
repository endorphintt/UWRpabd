import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { Product } from 'src/products/products.model'
import { Basket } from './baskets.model'

@Table({ tableName: 'baskets_product' })
export class BasketProduct extends Model<BasketProduct> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
    })
    id: number

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number

    @ForeignKey(() => Basket)
    @Column({ type: DataType.INTEGER })
    basketId: number

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
    quantity: number
}
