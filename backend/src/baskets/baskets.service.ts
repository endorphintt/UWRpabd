import { InjectModel } from '@nestjs/sequelize'
import { Injectable } from '@nestjs/common'
import { Basket } from './baskets.model'
import { CreateBasketDto } from './dto/create-basket.dto'
import { BasketProduct } from './baskets_product.model'
import { Product } from 'src/products/products.model'
import { AddProductToBasketDto } from './dto/add-product-to-basket.dto'
import { RemoveProductFromBasketDto } from './dto/remove-product-from-basket.dto'
import { GetProductsDto } from './dto/get-products.dto'

@Injectable()
export class BasketsService {
    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(Basket) private basketRepository: typeof Basket,
        @InjectModel(BasketProduct)
        private basketProductRepository: typeof BasketProduct
    ) {}

    async create(dto: CreateBasketDto) {
        const basket = await this.basketRepository.create(dto)
        return basket
    }

    async addProductToBasket(dto: AddProductToBasketDto) {
        const basket = await this.basketRepository.findByPk(dto.basketId)
        const product = await this.productRepository.findByPk(dto.productId)

        if (!basket || !product) {
            throw new Error('Basket or Product not found')
        }

        const basketProduct = await this.basketProductRepository.findOne({
            where: { basketId: dto.basketId, productId: dto.productId },
        })

        if (basketProduct) {
            basketProduct.quantity += dto.quantity
            await basketProduct.save()
        } else {
            await this.basketProductRepository.create({
                basketId: dto.basketId,
                productId: dto.productId,
                quantity: dto.quantity,
            })
        }

        return { message: 'Product added to basket successfully' }
    }

    async removeProductFromBasket(dto: RemoveProductFromBasketDto) {
        const basketProduct = await this.basketProductRepository.findOne({
            where: { basketId: dto.basketId, productId: dto.productId },
        })

        if (!basketProduct) {
            throw new Error('Product not found in basket')
        }

        await basketProduct.destroy()
        return { message: 'Product removed from basket successfully' }
    }

    async getProductsInBasket(dto: GetProductsDto): Promise<Product[]> {
        const basket = await this.basketRepository.findOne({
            where: { userId: dto.userId },
            include: {
                model: Product,
                through: {
                    attributes: ['quantity'],
                },
            },
        })

        if (!basket) {
            throw new Error('Basket not found for this user')
        }

        return basket.products
    }

    async increaseProductQuantity(
        dto: AddProductToBasketDto
    ): Promise<{ message: string }> {
        const basketProduct = await this.basketProductRepository.findOne({
            where: { basketId: dto.basketId, productId: dto.productId },
        })

        if (!basketProduct) {
            throw new Error('Product not found in basket')
        }

        basketProduct.quantity += 1
        await basketProduct.save()

        return { message: 'Product quantity increased successfully' }
    }

    async decreaseProductQuantity(
        dto: AddProductToBasketDto
    ): Promise<{ message: string }> {
        const basketProduct = await this.basketProductRepository.findOne({
            where: { basketId: dto.basketId, productId: dto.productId },
        })

        if (!basketProduct) {
            throw new Error('Product not found in basket')
        }

        if (basketProduct.quantity > 1) {
            basketProduct.quantity -= 1
            await basketProduct.save()
            return { message: 'Product quantity decreased successfully' }
        }

        await basketProduct.destroy()
        return { message: 'Product removed from basket' }
    }
}
