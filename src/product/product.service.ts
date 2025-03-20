import { Inject, Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { KEYCLOAK_INSTANCE } from 'nest-keycloak-connect'
import KeycloakConnect from 'keycloak-connect'

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(KEYCLOAK_INSTANCE)
    private readonly keycloak: KeycloakConnect.Keycloak,
  ) {}
  create(createProductDto: CreateProductDto) {
    return createProductDto
    // return this.prisma.product.create({
    //   data: createProductDto,
    // })
  }

  findAll() {
    return this.prisma.product.findMany()
  }

  findOne(id: string) {
    return this.prisma.product.findFirst({
      where: {
        id,
      },
    })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
