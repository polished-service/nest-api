import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { REFRESH_TOKEN_EXPIRES_IN } from './constants'
import { JwtPayloadWithExp } from './types/jwt-token-payload.type'

@Injectable()
export class BlacklistService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async addTokenToBlacklist(token: string): Promise<void> {
        const decodedToken = this.jwtService.decode(token) as JwtPayloadWithExp

        if (!decodedToken) {
            return
        }

        let ttl: number

        if (decodedToken && decodedToken.exp) {
            ttl = decodedToken.exp - decodedToken.iat
        } else {
            ttl = REFRESH_TOKEN_EXPIRES_IN
        }

        await this.cacheManager.set(token, 'blacklisted', ttl)
    }

    async isTokenBlacklisted(token: string): Promise<boolean> {
        const result = await this.cacheManager.get(token)
        return result === 'blacklisted'
    }
}
