import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { BasketProduct } from './baskets_product.model'
import { Product } from 'src/products/products.model'

@Table({ tableName: 'baskets' })
export class Basket extends Model<Basket> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
    })
    id: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User

    @BelongsToMany(() => Product, () => BasketProduct)
    products: Product[]
}
