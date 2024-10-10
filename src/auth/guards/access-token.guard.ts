import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access') {
    canActivate(context: ExecutionContext) {
        try {
            return super.canActivate(context)
        } catch (err) {
            throw new UnauthorizedException(err, 'Access token is invalid or expired')
        }
    }
}
