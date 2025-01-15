import {
    BelongsToMany,
    Column,
    DataType,
    HasOne,
    Model,
    Table,
} from 'sequelize-typescript'
import { Basket } from 'src/baskets/baskets.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'

interface UserCreationAttrs {
    email: string
    password: string
    name: string
}

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @Column({ type: DataType.STRING, allowNull: true })
    avatar: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasOne(() => Basket)
    basket: Basket
}
