import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { KeycloakAdminModule } from 'src/keycloak-admin/keycloak-admin.module'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [KeycloakAdminModule, PrismaModule],
})
export class AuthModule {}
