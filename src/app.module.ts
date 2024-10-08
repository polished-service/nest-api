import { Module } from '@nestjs/common'
import { CustomConfigModule } from './config/config.module'

@Module({
    imports: [CustomConfigModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
