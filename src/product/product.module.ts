import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { KeycloakConnectModule } from 'nest-keycloak-connect'
import { KeycloakConfigService } from 'src/keycloak/keycloak-config.service'
import { KeycloakModule } from 'src/keycloak/keycloak.module'

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    PrismaModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeycloakModule],
    }),
  ],
})
export class ProductModule {}
