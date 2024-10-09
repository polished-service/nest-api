import { PickType } from '@nestjs/mapped-types'
import { ResponseSignUpDto, SignUpDto } from './sign-up.dto'

export class SignInDto extends PickType(SignUpDto, ['email', 'password'] as const) {}

export type ResponseSignInDto = ResponseSignUpDto
