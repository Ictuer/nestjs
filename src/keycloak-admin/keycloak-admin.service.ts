import type KeycloakAdminClient from '@keycloak/keycloak-admin-client'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { EnvService } from 'src/env/env.service'
import { PrismaService } from 'src/prisma/prisma.service'
import '@keycloak/keycloak-admin-client'
@Injectable()
export class KeycloakAdminService implements OnModuleInit {
  private kcAdminClient: KeycloakAdminClient

  constructor(
    private readonly env: EnvService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    const { default: KeycloakAdminClient } = await eval(
      `import('@keycloak/keycloak-admin-client')`,
    )

    this.kcAdminClient = new KeycloakAdminClient({
      realmName: this.env.get('KEYCLOAK_MASTER_REALM'),
      baseUrl: this.env.get('KEYCLOAK_AUTH_SERVER_URL'),
    })
  }

  private async authenticateKcAdminClient() {
    await this.kcAdminClient.auth({
      grantType: 'password',
      clientId: 'admin-cli',
      username: this.env.get('KEYCLOAK_ADMIN_USERNAME'),
      password: this.env.get('KEYCLOAK_ADMIN_PASSWORD'),
    })
  }

  async register(payload: RegisterDto) {
    await this.authenticateKcAdminClient()

    const { id: keycloakUserId } = await this.kcAdminClient.users.create({
      realm: this.env.get('KEYCLOAK_REALM'),
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: payload.password,
          temporary: false,
        },
      ],
    })

    const user = await this.prisma.user.create({
      data: {
        keycloakUserId,
        username: payload.username,
      },
    })

    return user
  }

  async getUsers() {
    await this.authenticateKcAdminClient()

    return this.kcAdminClient.users.find({
      realm: this.env.get('KEYCLOAK_REALM'),
    })
  }
}
