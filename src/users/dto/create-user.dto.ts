import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @Length(3, 20)
    nickname: string

    @IsNotEmpty()
    @Length(6, 50)
    password: string
}
