import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Participant,
  ParticipantDocument,
} from '../participants/schemas/participant.schema';

@Injectable()
export class ParticipantsSeed {
  private readonly logger = new Logger(ParticipantsSeed.name);

  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
  ) {}

  async seed(): Promise<void> {
    this.logger.log('🌱 Iniciando seed de participantes...');

    try {
      // Verificar si ya existen participantes
      const existingCount = await this.participantModel.countDocuments();
      if (existingCount > 0) {
        this.logger.warn(
          `Ya existen ${existingCount} participantes. Saltando seed...`,
        );
        return;
      }

      const participants = this.generateParticipants(300);

      this.logger.log(`Creando ${participants.length} participantes...`);

      await this.participantModel.insertMany(participants);

      this.logger.log('✅ Seed de participantes completado exitosamente');
    } catch (error) {
      this.logger.error('❌ Error durante el seed de participantes:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    this.logger.log('🧹 Limpiando colección de participantes...');
    await this.participantModel.deleteMany({});
    this.logger.log('✅ Colección limpiada');
  }

  private generateParticipants(count: number): Partial<Participant>[] {
    const participants: Partial<Participant>[] = [];
    const usedEmails = new Set<string>();

    // Nombres sin acentos para evitar problemas con emails
    const firstNames = [
      'Maria',
      'Jose',
      'Ana',
      'Carlos',
      'Luis',
      'Carmen',
      'Antonio',
      'Francisca',
      'Manuel',
      'Isabel',
      'Jesus',
      'Pilar',
      'Alejandro',
      'Dolores',
      'David',
      'Teresa',
      'Pedro',
      'Rosa',
      'Javier',
      'Antonia',
      'Miguel',
      'Mercedes',
      'Fernando',
      'Josefa',
      'Rafael',
      'Elena',
      'Francisco',
      'Concepcion',
      'Jorge',
      'Manuela',
      'Juan',
      'Margarita',
      'Sergio',
      'Cristina',
      'Pablo',
      'Andrea',
      'Ricardo',
      'Lucia',
      'Alberto',
      'Monica',
      'Roberto',
      'Sandra',
      'Enrique',
      'Patricia',
      'Raul',
      'Laura',
      'Adrian',
      'Beatriz',
      'Angel',
      'Nuria',
      'Ivan',
      'Silvia',
      'Ruben',
      'Alicia',
      'Oscar',
      'Natalia',
    ];

    const lastNames = [
      'Garcia',
      'Rodriguez',
      'Gonzalez',
      'Fernandez',
      'Lopez',
      'Martinez',
      'Sanchez',
      'Perez',
      'Gomez',
      'Martin',
      'Jimenez',
      'Ruiz',
      'Hernandez',
      'Diaz',
      'Moreno',
      'Munoz',
      'Alvarez',
      'Romero',
      'Alonso',
      'Gutierrez',
      'Navarro',
      'Torres',
      'Dominguez',
      'Vazquez',
      'Ramos',
      'Gil',
      'Ramirez',
      'Serrano',
      'Blanco',
      'Suarez',
      'Molina',
      'Morales',
      'Ortega',
      'Delgado',
      'Castro',
      'Ortiz',
      'Rubio',
      'Marin',
      'Sanz',
      'Iglesias',
      'Medina',
      'Garrido',
      'Cortes',
      'Castillo',
      'Santos',
      'Lozano',
      'Guerrero',
      'Cano',
      'Prieto',
      'Mendez',
      'Cruz',
      'Calvo',
      'Gallego',
      'Vidal',
    ];

    // Dominios de email comunes
    const emailDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'email.com',
      'live.com',
      'icloud.com',
      'protonmail.com',
    ];

    for (let i = 0; i < count; i++) {
      let email: string;
      let attempts = 0;

      // Generar email único que cumpla con el regex
      do {
        const firstName =
          firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName =
          lastNames[Math.floor(Math.random() * lastNames.length)];
        const domain =
          emailDomains[Math.floor(Math.random() * emailDomains.length)];

        // Limpiar nombres para email (solo letras y números)
        const cleanFirstName = firstName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '');
        const cleanLastName = lastName.toLowerCase().replace(/[^a-z0-9]/g, '');

        // Generar número único para evitar duplicados
        const uniqueNum = Math.floor(Math.random() * 9999) + 1;

        // Formatos de email seguros que cumplen el regex
        const formats = [
          `${cleanFirstName}.${cleanLastName}@${domain}`,
          `${cleanFirstName}${cleanLastName}@${domain}`,
          `${cleanFirstName}${uniqueNum}@${domain}`,
          `${cleanFirstName}.${cleanLastName}${uniqueNum}@${domain}`,
          `${cleanFirstName}_${cleanLastName}@${domain}`,
        ];

        email = formats[Math.floor(Math.random() * formats.length)];
        attempts++;

        // Fallback con formato simple garantizado
        if (attempts > 10) {
          email = `user${i}${Date.now()}@${domain}`;
          break;
        }
      } while (usedEmails.has(email));

      usedEmails.add(email);

      // Generar nombre completo (con acentos para mostrar, solo el email sin acentos)
      const firstNameDisplay = [
        'María',
        'José',
        'Ana',
        'Carlos',
        'Luis',
        'Carmen',
        'Antonio',
        'Francisca',
        'Manuel',
        'Isabel',
        'Jesús',
        'Pilar',
        'Alejandro',
        'Dolores',
        'David',
        'Teresa',
        'Pedro',
        'Rosa',
        'Javier',
        'Antonia',
        'Miguel',
        'Mercedes',
        'Fernando',
        'Josefa',
        'Rafael',
        'Elena',
        'Francisco',
        'Concepción',
        'Jorge',
        'Manuela',
        'Juan',
        'Margarita',
        'Sergio',
        'Cristina',
        'Pablo',
        'Andrea',
        'Ricardo',
        'Lucía',
        'Alberto',
        'Mónica',
        'Roberto',
        'Sandra',
        'Enrique',
        'Patricia',
        'Raúl',
        'Laura',
        'Adrián',
        'Beatriz',
        'Ángel',
        'Nuria',
        'Iván',
        'Silvia',
        'Rubén',
        'Alicia',
        'Óscar',
        'Natalia',
      ];

      const lastNamesDisplay = [
        'García',
        'Rodríguez',
        'González',
        'Fernández',
        'López',
        'Martínez',
        'Sánchez',
        'Pérez',
        'Gómez',
        'Martín',
        'Jiménez',
        'Ruiz',
        'Hernández',
        'Díaz',
        'Moreno',
        'Muñoz',
        'Álvarez',
        'Romero',
        'Alonso',
        'Gutiérrez',
        'Navarro',
        'Torres',
        'Domínguez',
        'Vázquez',
        'Ramos',
        'Gil',
        'Ramírez',
        'Serrano',
        'Blanco',
        'Suárez',
        'Molina',
        'Morales',
        'Ortega',
        'Delgado',
        'Castro',
        'Ortiz',
        'Rubio',
        'Marín',
        'Sanz',
        'Iglesias',
        'Medina',
        'Garrido',
        'Cortés',
        'Castillo',
        'Santos',
        'Lozano',
        'Guerrero',
        'Cano',
        'Prieto',
        'Méndez',
        'Cruz',
        'Calvo',
        'Gallego',
        'Vidal',
      ];

      const firstName =
        firstNameDisplay[Math.floor(Math.random() * firstNameDisplay.length)];
      const lastName1 =
        lastNamesDisplay[Math.floor(Math.random() * lastNamesDisplay.length)];
      const lastName2 =
        lastNamesDisplay[Math.floor(Math.random() * lastNamesDisplay.length)];
      const fullName = `${firstName} ${lastName1} ${lastName2}`;

      // Generar teléfono (70% de probabilidad de tener teléfono)
      const hasPhone = Math.random() > 0.3;
      let phone: string | undefined;

      if (hasPhone) {
        // Formatos de teléfono peruanos comunes
        const formats = [
          `9${Math.floor(Math.random() * 90000000 + 10000000)}`, // Celular peruano
          `+51 9${Math.floor(Math.random() * 90000000 + 10000000)}`, // Con código país
          `(01) ${Math.floor(Math.random() * 9000000 + 1000000)}`, // Fijo Lima
        ];
        phone = formats[Math.floor(Math.random() * formats.length)];
      }

      // Fechas de creación distribuidas en los últimos 30 días
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const createdAt = new Date(
        thirtyDaysAgo.getTime() +
          Math.random() * (now.getTime() - thirtyDaysAgo.getTime()),
      );

      // Validar email antes de agregarlo
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        this.logger.warn(`Email inválido generado: ${email}, usando fallback`);
        email = `user${i}${Date.now()}@gmail.com`;
      }

      participants.push({
        email,
        fullName,
        phone,
        createdAt,
        updatedAt: createdAt,
      });
    }

    return participants;
  }
}
