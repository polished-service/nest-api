import { Module } from '@nestjs/common'
import { CustomConfigModule } from './config/config.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [CustomConfigModule, PrismaModule, UsersModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
