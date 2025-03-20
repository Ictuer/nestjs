import { Injectable } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { KeycloakAdminService } from 'src/keycloak-admin/keycloak-admin.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly keycloakAdminService: KeycloakAdminService,
    private readonly prisma: PrismaService,
  ) {}

  async register(payload: RegisterDto) {
    return await this.keycloakAdminService.register(payload)
  }

  async getMe(keycloakUserId: string) {
    return this.prisma.user.findFirst({
      where: {
        keycloakUserId: keycloakUserId,
      },
    })
  }
}
