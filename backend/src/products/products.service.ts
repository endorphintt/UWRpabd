import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Product } from './products.model'
import { ProductImage } from './product_image.model'
import { CreateProductDto } from './dto/create-product.dto'
import { FilesService } from 'src/files/files.service'
import { DeleteProductDto } from './dto/delete-product.dto'
import * as fs from 'fs'
import * as path from 'path'
import { Op } from 'sequelize'

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(ProductImage) private imageRepository: typeof ProductImage,
        private fileService: FilesService
    ) {}

    async createProduct(dto: CreateProductDto, images: any[]): Promise<any> {
        const product = await this.productRepository.create({ ...dto })
        if (images && images.length > 0) {
            const imageFiles = await Promise.all(
                images.map(async (image) => {
                    const fileName = await this.fileService.createFile(image)
                    return { image_url: fileName, productId: product.id }
                })
            )

            await this.imageRepository.bulkCreate(imageFiles)
        }

        return this.getProductById(product.id)
    }

    async getAllProducts(
        sort: string = 'name',
        order: string = 'ASC',
        minPrice?: number,
        maxPrice?: number,
        name?: string
    ): Promise<any> {
        const where: any = {}

        if (minPrice) where.price = { [Op.gte]: minPrice }
        if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice }

        if (name) where.name = { [Op.iLike]: `%${name}%` }

        const products = await this.productRepository.findAll({
            where,
            include: [ProductImage],
            order: [[sort, order]],
        })

        return products.map((product) => ({
            ...product.get({ plain: true }),
            images: product.images.map((image) => image.image_url),
        }))
    }

    async getProductById(id: number): Promise<any> {
        const product = await this.productRepository.findByPk(id, {
            include: [ProductImage],
        })

        if (!product) {
            throw new NotFoundException('Product not found')
        }

        return {
            ...product.get({ plain: true }),
            images: product.images.map((image) => image.image_url),
        }
    }

    async delete(dto: DeleteProductDto) {
        const product = await this.productRepository.findByPk(dto.productId, {
            include: [ProductImage],
        })

        if (!product) {
            throw new NotFoundException('Product not found')
        }

        if (product.images && product.images.length > 0) {
            product.images.forEach((image) => {
                const filePath = path.resolve(
                    __dirname,
                    '..',
                    'static',
                    image.image_url
                )
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
            })
        }
        await this.imageRepository.destroy({
            where: { productId: dto.productId },
        })

        await this.productRepository.destroy({ where: { id: dto.productId } })

        return { message: 'Product deleted successfully' }
    }
}
