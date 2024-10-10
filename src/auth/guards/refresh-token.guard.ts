import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { AuthService } from '../auth.service'

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    constructor(private readonly authService: AuthService) {
        super()
    }

    canActivate(context: ExecutionContext) {
        try {
            return super.canActivate(context)
        } catch (err) {
            const ctx = context.switchToHttp()
            const res = ctx.getResponse<Response>()

            this.authService.logout(res)

            throw new ForbiddenException(err, 'Refresh token is invalid or expired')
        }
    }
}
