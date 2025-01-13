import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Order } from './orders.model'
import { OrderProducts } from './order_products.model'
import { Product } from 'src/products/products.model'
import { Basket } from 'src/baskets/baskets.model'
import { BasketProduct } from 'src/baskets/baskets_product.model'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order) private orderRepository: typeof Order,
        @InjectModel(OrderProducts)
        private orderProductsRepository: typeof OrderProducts,
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(Basket) private basketRepository: typeof Basket
    ) {}

    async createOrder(
        userId: number,
        createOrderDto: CreateOrderDto
    ): Promise<Order> {
        const basket = await this.basketRepository.findOne({
            where: { userId },
            include: {
                model: Product,
                through: {
                    attributes: ['quantity'], // Вказуємо тільки необхідні атрибути
                },
            },
        })

        if (!basket || basket.products.length === 0) {
            throw new Error('Your basket is empty!')
        }

        const order = await this.orderRepository.create({
            userId,
            totalPrice: createOrderDto.totalPrice, // Отримуємо загальну суму з тіла запиту
            address: createOrderDto.address,
            phone: createOrderDto.phone,
            name: createOrderDto.name,
        })

        for (const product of basket.products) {
            await this.orderProductsRepository.create({
                orderId: order.id,
                productId: product.id,
                quantity: product['BasketProduct'].quantity,
                price_at_order: product.price,
            })
        }

        await basket.$set('products', [])
        return order
    }

    async deleteOrder(orderId: number): Promise<void> {
        const order = await this.orderRepository.findByPk(orderId)
        if (!order) {
            throw new Error('Order not found')
        }
        await order.destroy()
    }

    async changeOrderStatus(orderId: number, status: string): Promise<Order> {
        const order = await this.orderRepository.findByPk(orderId)
        if (!order) {
            throw new Error('Order not found')
        }
        order.status = status
        await order.save()
        return order
    }

    async getAllOrders(): Promise<Order[]> {
        return this.orderRepository.findAll({
            include: {
                model: Product,
                through: {
                    attributes: ['quantity', 'price_at_order'],
                },
            },
        })
    }

    async getOrderById(orderId: number): Promise<Order> {
        const order = await this.orderRepository.findByPk(orderId, {
            include: {
                model: Product,
                through: {
                    attributes: ['quantity', 'price_at_order'],
                },
            },
        })
        if (!order) {
            throw new Error('Order not found')
        }
        return order
    }

    async getOrdersByUserId(userId: number): Promise<Order[]> {
        return this.orderRepository.findAll({
            where: { userId },
            include: {
                model: Product,
                through: {
                    attributes: ['quantity', 'price_at_order'],
                },
            },
        })
    }
}
