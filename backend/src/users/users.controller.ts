import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UsePipes,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { BanUserDto } from './dto/ban.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    // @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    // @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto)
    }

    // Роут для розбану
    @UseGuards(RolesGuard)
    @Post('unban')
    unban(@Body() dto: BanUserDto) {
        return this.usersService.unban(dto)
    }
}
