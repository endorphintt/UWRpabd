import { Module, forwardRef } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './users.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { AuthModule } from 'src/auth/auth.module'
import { Basket } from 'src/baskets/baskets.model'
import { BasketsModule } from 'src/baskets/baskets.module'

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles, Basket]),
        RolesModule,
        forwardRef(() => AuthModule),
        BasketsModule,
    ],
    exports: [UsersService],
})
export class UsersModule {}
