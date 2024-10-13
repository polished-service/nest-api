import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { ConfigService } from '@nestjs/config'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_EXPIRES_IN } from './constants'
import { User } from '@prisma/client'
import { AuthConfig } from '../config/config'
import { Response } from 'express'
import { JwtTokenPayload } from './types/jwt-token-payload.type'
import { BlacklistService } from './blacklist.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly blacklistService: BlacklistService
    ) {}

    async signUp(signUpDto: SignUpDto, res: Response) {
        const user = await this.usersService.createUser(signUpDto)

        const tokens = await this.getTokens(user)

        this.setAuthCookies(tokens, res)

        return {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
        }
    }

    async signIn(signInDto: SignInDto, res: Response) {
        const { email, password } = signInDto

        const user = await this.usersService.getUserByEmail({ email })

        if (!user) {
            throw new UnauthorizedException('Invalid email')
        }

        const isPasswordValid = await this.usersService.validatePassword(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password')
        }

        const tokens = await this.getTokens(user)

        this.setAuthCookies(tokens, res)

        return {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
        }
    }

    async getTokens(user: Pick<User, 'email' | 'id'>) {
        const { id: userId, email } = user

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { sub: userId, email },
                {
                    secret: this.configService.get<AuthConfig>('jwt').accessSecret,
                    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
                }
            ),
            this.jwtService.signAsync(
                { sub: userId, email },
                {
                    secret: this.configService.get<AuthConfig>('jwt').refreshSecret,
                    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
                }
            ),
        ])

        return {
            accessToken,
            refreshToken,
        }
    }

    logout(res: Response, refreshToken: string) {
        void this.blacklistService.addTokenToBlacklist(refreshToken)

        res.clearCookie(ACCESS_TOKEN_COOKIE, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
        })

        res.clearCookie(REFRESH_TOKEN_COOKIE, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
        })

        return true
    }

    async refresh(res: Response, user: JwtTokenPayload) {
        const { sub: userId, email } = user

        const tokens = await this.getTokens({ id: userId, email })

        this.setAuthCookies(tokens, res)

        return true
    }

    private setAuthCookies(tokens: { accessToken: string; refreshToken: string }, res: Response) {
        res.cookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        })

        res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
    }
}
