import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: false,
      }),
    );

    app.enableCors({
      origin: envs.ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });

    await app.listen(envs.PORT);

    logger.log(`🚀 Aplicación ejecutándose en el puerto ${envs.PORT}`);

    logger.log(`🎲 API para sorteos lista para usar`);
  } catch (error) {
    logger.error('❌ Error durante el bootstrap:', error);
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error('💥 Error fatal durante el bootstrap:', err);
  process.exit(1);
});
