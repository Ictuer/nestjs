import { NestFactory } from '@nestjs/core'
import * as NestJSCommand from 'nestjs-command'
import { CommandModule } from './command/command.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CommandModule, {
    logger: false,
  })

  try {
    await app
      .select(NestJSCommand.CommandModule)
      .get(NestJSCommand.CommandService)
      .exec()
    await app.close()
  } catch (error) {
    console.error(error)
    await app.close()
    process.exit(1)
  }
}

bootstrap()
