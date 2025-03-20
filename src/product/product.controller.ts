import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import {
  Resource,
  Scopes,
  AuthenticatedUser,
  KEYCLOAK_INSTANCE,
} from 'nest-keycloak-connect'
import { Prisma } from '@prisma/client'
import { Keycloak } from 'keycloak-connect'

@Controller('products')
@Resource(Prisma.ModelName.Product)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(KEYCLOAK_INSTANCE) keycloak: Keycloak,
  ) {}

  @Post()
  @Scopes('Create')
  create(
    @AuthenticatedUser() user,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(createProductDto)
  }

  @Get()
  @Scopes('Read')
  findAll() {
    return this.productService.findAll()
  }

  @Get(':id')
  @Scopes('Read')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id)
  }

  @Patch(':id')
  @Scopes('Update')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto)
  }

  @Delete(':id')
  @Scopes('Delete')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id)
  }
}
