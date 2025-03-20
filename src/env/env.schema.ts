import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator'

enum Environment {
  development = 'development',
  production = 'production',
}

export class EnvSchema {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 2302

  @IsString()
  DATABASE_URL: string

  @IsString()
  KEYCLOAK_AUTH_SERVER_URL: string

  @IsString()
  KEYCLOAK_REALM: string

  @IsString()
  KEYCLOAK_MASTER_REALM: string

  @IsString()
  KEYCLOAK_ADMIN_USERNAME: string

  @IsString()
  KEYCLOAK_ADMIN_PASSWORD: string

  @IsString()
  KEYCLOAK_ACCOUNT_CLIENT_ID: string

  @IsString()
  KEYCLOAK_SECRET: string
}
