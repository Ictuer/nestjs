import { Injectable } from '@nestjs/common'
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect'
import { EnvService } from 'src/env/env.service'

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private readonly env: EnvService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.env.get('KEYCLOAK_AUTH_SERVER_URL'),
      realm: this.env.get('KEYCLOAK_REALM'),
      clientId: this.env.get('KEYCLOAK_ACCOUNT_CLIENT_ID'),
      secret: this.env.get('KEYCLOAK_SECRET'),
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
      useNestLogger: false,
    }
  }
}
