import { CreateUserDto } from '../../users/dto/create-user.dto'

export class SignUpDto extends CreateUserDto {}

export type ResponseSignUpDto = {
    id: number
    email: string
    nickname: string
}
