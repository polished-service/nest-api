import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const configService = app.get<ConfigService>(ConfigService)

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    )

    const port = configService.get<number>('port')

    await app.listen(port, () => console.log(`Server has been started on port ${port}`))
}
void bootstrap()
