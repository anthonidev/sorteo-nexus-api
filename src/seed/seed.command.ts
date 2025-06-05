import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module';
import { SeedsService } from './seeds.service';

async function runSeed() {
  const logger = new Logger('SeedCommand');

  try {
    logger.log('🚀 Iniciando aplicación para seed...');

    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });

    const seedsService = app.get(SeedsService);

    // Obtener argumentos de línea de comandos
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
      case 'run':
        await seedsService.runSeeds();
        break;
      case 'clear':
        await seedsService.clearDatabase();
        break;
      case 'participants':
        await seedsService.seedParticipants();
        break;
      default:
        logger.log('Comandos disponibles:');
        logger.log('  npm run seed run         - Ejecutar todos los seeds');
        logger.log('  npm run seed clear       - Limpiar base de datos');
        logger.log('  npm run seed participants - Solo seed de participantes');
        break;
    }

    await app.close();
    logger.log('✅ Proceso completado');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Error durante el seed:', error);
    process.exit(1);
  }
}

void runSeed();
