import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from './config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
            expandVariables: true,
        }),
    ],
})
export class CustomConfigModule {}
