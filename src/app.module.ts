import { Module } from '@nestjs/common'
import { EnvModule } from './env/env.module'

import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect'
import { APP_GUARD } from '@nestjs/core'
import { KeycloakModule } from './keycloak/keycloak.module'
import { KeycloakConfigService } from './keycloak/keycloak-config.service'
import { ProductModule } from './product/product.module'
import { PrismaModule } from './prisma/prisma.module'
import { KeycloakAdminModule } from './keycloak-admin/keycloak-admin.module'
import { AuthModule } from './auth/auth.module'
import { AuthZModule } from 'nest-authz'
import { PrismaAdapter } from 'casbin-prisma-adapter'

@Module({
  imports: [
    EnvModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeycloakModule],
    }),
    ProductModule,
    PrismaModule,
    KeycloakAdminModule,
    AuthModule,
    AuthZModule.register({
      model: 'model.conf',
      policy: PrismaAdapter.newAdapter(),
      userFromContext: (ctx) => {
        console.log(ctx)
        const request = ctx.switchToHttp().getRequest()
        return request.user && request.user.username
      },
      resourceFromContext: (ctx, perm) => {
        const request = ctx.switchToHttp().getRequest()
        return { type: perm.resource, id: request.id }
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
