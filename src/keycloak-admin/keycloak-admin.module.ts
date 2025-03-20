import { Module } from '@nestjs/common'
import { KeycloakAdminService } from './keycloak-admin.service'
import { EnvModule } from 'src/env/env.module'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [KeycloakAdminService],
  exports: [KeycloakAdminService],
})
export class KeycloakAdminModule {}
