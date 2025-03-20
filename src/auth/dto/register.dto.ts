import { IsString } from 'class-validator'

export class RegisterDto {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsString()
  firstName?: string

  @IsString()
  lastName?: string
}
