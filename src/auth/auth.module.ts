import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy'
import { AccessTokenStrategy } from './strategies/access-token.strategy'

@Module({
    imports: [UsersModule, PassportModule, ConfigModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
