import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ResponseSignUpDto, SignUpDto } from './dto/sign-up.dto'
import { ResponseSignInDto, SignInDto } from './dto/sign-in.dto'
import { Response } from 'express'

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
}
