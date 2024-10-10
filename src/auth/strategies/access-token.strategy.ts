import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { AuthConfig } from '../../config/config'
import { ACCESS_TOKEN_COOKIE } from '../constants'
import { Request } from 'express'
import { JwtTokenPayload } from '../types/jwt-token-payload.type'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(configService: ConfigService) {
        const jwtConfig = configService.get<AuthConfig>('jwt')
        const secret = jwtConfig.accessSecret

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.[ACCESS_TOKEN_COOKIE]
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: secret,
        })
    }

    async validate(payload: JwtTokenPayload) {
        return { userId: payload.sub, email: payload.email }
    }
}
