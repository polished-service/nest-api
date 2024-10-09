import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    async signUp() {
        return this.authService.signUp()
    }

    async signIn() {
        return this.authService.signIn()
    }
}
