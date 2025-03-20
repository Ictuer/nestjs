import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ExampleCommand {
  @Command({ command: 'example', describe: 'Example command' })
  async example() {
    console.log('Hi From Example Command!')
  }
}
