import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const env = app.get(EnvService)
  const logger = new Logger('>_<')

  const PORT = env.get('PORT')
  await app.listen(PORT, () => {
    logger.log(`Server is listening on port ${PORT}`)
  })
}
bootstrap()
