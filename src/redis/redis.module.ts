import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { CustomConfigModule } from '../config/config.module'
import { ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { RedisConfig } from '../config/config'

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [CustomConfigModule],
            inject: [ConfigService],
            isGlobal: true,
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get<RedisConfig>('redis').host,
                port: configService.get<RedisConfig>('redis').port,
            }),
        }),
    ],
    exports: [CacheModule],
})
export class RedisModule {}
