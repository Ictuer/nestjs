import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { KeycloakAdminService } from '../keycloak-admin/keycloak-admin.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SyncUsersFromKeycloakCommand {
  constructor(
    private readonly kcAdminService: KeycloakAdminService,
    private readonly prisma: PrismaService,
  ) {}

  @Command({ command: 'sync:users', describe: 'Sync users from Keycloak' })
  async syncUsers() {
    console.log('🔄 Đang lấy danh sách người dùng từ Keycloak...')
    const users = await this.kcAdminService.getUsers()

    for (const user of users) {
      const existed = await this.prisma.user.count({
        where: { username: user.username },
      })
      if (existed) continue

      await this.prisma.user.create({
        data: {
          keycloakUserId: user.id,
          username: user.username,
        },
      })
      console.log(`🔄 Đồng bộ: ${user.username}`)
    }

    console.log('✅ Hoàn tất đồng bộ người dùng!')
  }
}
