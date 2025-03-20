import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { PrismaModule } from '../prisma/prisma.module'
import { ExampleCommand } from './example.command'
import * as NestJSCommand from 'nestjs-command'
import { KeycloakAdminModule } from '../keycloak-admin/keycloak-admin.module'
import { SyncUsersFromKeycloakCommand } from './sync-user-from-keycloak.command'

@Module({
  imports: [
    EnvModule,
    PrismaModule,
    KeycloakAdminModule,
    NestJSCommand.CommandModule,
  ],
  providers: [ExampleCommand, SyncUsersFromKeycloakCommand],
})
export class CommandModule {}
