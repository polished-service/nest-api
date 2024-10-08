import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from './config'

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            expandVariables: true,
        }),
    ],
})
export class CustomConfigModule {}
