import { Module } from '@nestjs/common'
import { CustomConfigModule } from './config/config.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
    imports: [CustomConfigModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
