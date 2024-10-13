import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from '../auth.service'
import { BlacklistService } from '../blacklist.service'
import { REFRESH_TOKEN_COOKIE } from '../constants'

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    constructor(
        private readonly authService: AuthService,
        private readonly blacklistService: BlacklistService
    ) {
        super()
    }

    canActivate(context: ExecutionContext): Promise<boolean> {
        return this.validateRequest(context)
    }

    private async validateRequest(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest<Request>()
        const res = ctx.getResponse<Response>()

        const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE]

        if (!refreshToken) {
            throw new ForbiddenException('Refresh token missing')
        }

        const isBlacklisted = await this.blacklistService.isTokenBlacklisted(refreshToken)
        if (isBlacklisted) {
            this.authService.logout(res, refreshToken)

            throw new ForbiddenException('Refresh token is blacklisted')
        }

        try {
            return super.canActivate(context) as Promise<boolean>
        } catch (err) {
            this.authService.logout(res, refreshToken)

            throw new ForbiddenException(err, 'Refresh token is invalid or expired')
        }
    }
}
