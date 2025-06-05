import { Injectable, Logger } from '@nestjs/common';
import { ParticipantsSeed } from './participants.seed';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(private readonly participantsSeed: ParticipantsSeed) {}

  async runSeeds(): Promise<void> {
    this.logger.log('🌱 Iniciando proceso de seeds...');

    try {
      await this.participantsSeed.seed();
      this.logger.log('✅ Todos los seeds completados exitosamente');
    } catch (error) {
      this.logger.error('❌ Error durante el proceso de seeds:', error);
      throw error;
    }
  }

  async clearDatabase(): Promise<void> {
    this.logger.log('🧹 Limpiando base de datos...');

    try {
      await this.participantsSeed.clear();
      this.logger.log('✅ Base de datos limpiada exitosamente');
    } catch (error) {
      this.logger.error('❌ Error durante la limpieza:', error);
      throw error;
    }
  }

  async seedParticipants(): Promise<void> {
    this.logger.log('🌱 Ejecutando seed de participantes...');

    try {
      await this.participantsSeed.seed();
      this.logger.log('✅ Seed de participantes completado');
    } catch (error) {
      this.logger.error('❌ Error en seed de participantes:', error);
      throw error;
    }
  }
}
