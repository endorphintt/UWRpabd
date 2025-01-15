import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post('create')
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.createOrder(
            createOrderDto.userId,
            createOrderDto
        )
    }

    @Delete(':id')
    async deleteOrder(@Param('id') orderId: number) {
        return this.ordersService.deleteOrder(orderId)
    }

    @Post('status/:id')
    async changeOrderStatus(
        @Param('id') orderId: number,
        @Body() statusDto: { status: string }
    ) {
        return this.ordersService.changeOrderStatus(orderId, statusDto.status)
    }

    @Get()
    async getAllOrders() {
        return this.ordersService.getAllOrders()
    }

    @Get(':id')
    async getOrderById(@Param('id') orderId: number) {
        return this.ordersService.getOrderById(orderId)
    }

    @Get('user/:userId')
    async getOrdersByUserId(@Param('userId') userId: number) {
        return this.ordersService.getOrdersByUserId(userId)
    }
}
