import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { FindUserDto } from './dto/find-user.dto'
import { Prisma, User } from '@prisma/client'
import { hash, verify } from 'argon2'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, nickname, password } = createUserDto

        try {
            const hashedPassword = await hash(password)

            return await this.prisma.user.create({
                data: {
                    email,
                    nickname,
                    password: hashedPassword,
                },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException({
                    message: 'User with this email already exists',
                })
            }
            throw new InternalServerErrorException({
                message: 'Failed to create user',
                originalError: error.message,
            })
        }
    }

    async getUserByEmail(findUserDto: FindUserDto): Promise<User | null> {
        const { email } = findUserDto

        try {
            return await this.prisma.user.findUnique({
                where: { email },
            })
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Failed to retrieve user',
                originalError: error.message,
            })
        }
    }

    async getAllUsers(): Promise<Omit<User, 'password'>[]> {
        return this.prisma.user.findMany().then((users) => users.map(({ password: _password, ...user }) => user))
    }

    async validatePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await verify(hashedPassword, candidatePassword)
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Failed to validate password',
                originalError: error.message,
            })
        }
    }
}
