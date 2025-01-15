import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function start() {
    const PORT = process.env.PORT || 5001
    const app = await NestFactory.create(AppModule)
    app.enableCors()

    await app.listen(PORT, () =>
        console.log(`Server started on port = ${PORT}`)
    )
}

start()
