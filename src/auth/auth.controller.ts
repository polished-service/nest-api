import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ResponseSignUpDto, SignUpDto } from './dto/sign-up.dto'
import { ResponseSignInDto, SignInDto } from './dto/sign-in.dto'
import { Response } from 'express'
import { AccessTokenGuard } from './guards/access-token.guard'
import { RefreshTokenGuard } from './guards/refresh-token.guard'
import { GetCurrentUser } from './decoratos/get-current-user.decorator'
import { JwtTokenPayload } from './types/jwt-token-payload.type'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) res: Response): Promise<ResponseSignUpDto> {
        return this.authService.signUp(signUpDto, res)
    }

    @Post('sign-in')
    @HttpCode(HttpStatus.CREATED)
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response): Promise<ResponseSignInDto> {
        return this.authService.signIn(signInDto, res)
    }

    @UseGuards(AccessTokenGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({ passthrough: true }) res: Response): Promise<boolean> {
        return this.authService.logout(res)
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Res({ passthrough: true }) res: Response, @GetCurrentUser() user: JwtTokenPayload): Promise<boolean> {
        return this.authService.refresh(res, user)
    }
}
