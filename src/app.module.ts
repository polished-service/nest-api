import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RedisModule } from './redis/redis.module'
import { CustomConfigModule } from './config/config.module'

@Module({
    imports: [CustomConfigModule, PrismaModule, UsersModule, AuthModule, RedisModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
