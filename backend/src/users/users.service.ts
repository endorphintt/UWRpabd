import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './users.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from 'src/roles/roles.service'
import { BanUserDto } from './dto/ban.dto'
import { BasketsService } from 'src/baskets/baskets.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
        private basketRepository: BasketsService
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.rolesService.getRoleByValue('user')
        await user.$set('roles', [role.id])
        user.roles = [role]
        const basket = await this.basketRepository.create({ userId: user.id })
        user.basket = basket
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: { all: true },
        })
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        })
        return user
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException('user is not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.banReason = dto.banReason
        await user.save()
        return user
    }

    // Метод для розбану користувача
    async unban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException('user is not found', HttpStatus.NOT_FOUND)
        }
        user.banned = false
        user.banReason = null
        await user.save()
        return user
    }
}
