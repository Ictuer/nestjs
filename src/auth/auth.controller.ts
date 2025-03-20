import { Controller, Post, Body, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { AuthenticatedUser, Public } from 'nest-keycloak-connect'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  getMe(@AuthenticatedUser() user: { sub: string }) {
    return this.authService.getMe(user.sub)
  }

  @Post('register')
  @Public()
  register(@Body() payload: RegisterDto) {
    return this.authService.register(payload)
  }
}
