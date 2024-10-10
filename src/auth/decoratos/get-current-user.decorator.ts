import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtTokenPayload } from '../types/jwt-token-payload.type'

export const GetCurrentUser = createParamDecorator((data: keyof JwtTokenPayload | undefined, ctx: ExecutionContext): JwtTokenPayload | any => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    if (data) {
        return user?.[data]
    }

    return user
})
