import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { Product } from './products.model'

@Table({ tableName: 'product_images' })
export class ProductImage extends Model<ProductImage> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        type: DataType.INTEGER,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    image_url: string

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number

    @BelongsTo(() => Product)
    product: Product
}
