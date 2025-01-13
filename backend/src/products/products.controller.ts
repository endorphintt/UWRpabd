import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Roles } from 'src/auth/roles-auth.decorator'
import { DeleteProductDto } from './dto/delete-product.dto'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    async create(
        @Body() dto: CreateProductDto,
        @UploadedFiles() images: any[]
    ): Promise<any> {
        return this.productsService.createProduct(dto, images)
    }

    @Get()
    async getAll(): Promise<any> {
        return this.productsService.getAllProducts()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<any> {
        return this.productsService.getProductById(+id)
    }

    @Post('/delete')
    async removeProduct(@Body() dto: DeleteProductDto) {
        return this.productsService.delete(dto)
    }
}
