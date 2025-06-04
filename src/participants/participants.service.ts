import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantResponseDto } from './dto/participant-response.dto';
import { ParticipantsListResponseDto } from './dto/participants-list-response.dto';
import { Participant, ParticipantDocument } from './schemas/participant.schema';

@Injectable()
export class ParticipantsService {
  private readonly logger = new Logger(ParticipantsService.name);

  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
  ) {}

  async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<ParticipantResponseDto> {
    try {
      this.logger.log(
        `Intentando registrar participante con email: ${createParticipantDto.email}`,
      );

      const existingParticipant = await this.participantModel
        .findOne({
          email: createParticipantDto.email.toLowerCase(),
        })
        .exec();

      if (existingParticipant) {
        this.logger.warn(`Email ya registrado: ${createParticipantDto.email}`);
        throw new ConflictException(
          'Este email ya está registrado en el sorteo',
        );
      }

      const newParticipant = new this.participantModel(createParticipantDto);
      const savedParticipant = await newParticipant.save();

      this.logger.log(
        `Participante registrado exitosamente: ${savedParticipant.email}`,
      );

      return this.formatParticipantResponse(savedParticipant);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      this.logger.error(
        `Error al registrar participante: ${error.message}`,
        error.stack,
      );

      if (error.code === 11000) {
        throw new ConflictException(
          'Este email ya está registrado en el sorteo',
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<ParticipantsListResponseDto> {
    try {
      this.logger.log('Obteniendo lista de participantes');

      const participants = await this.participantModel
        .find()
        .sort({ createdAt: -1 })
        .exec();

      const formattedParticipants = participants.map((participant) =>
        this.formatParticipantResponse(participant),
      );

      this.logger.log(`Se encontraron ${participants.length} participantes`);

      return {
        participants: formattedParticipants,
        total: participants.length,
        message: `Se encontraron ${participants.length} participantes registrados`,
      };
    } catch (error) {
      this.logger.error(
        `Error al obtener participantes: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async getParticipantCount(): Promise<number> {
    return this.participantModel.countDocuments().exec();
  }

  async findByEmail(email: string): Promise<ParticipantResponseDto | null> {
    const participant = await this.participantModel
      .findOne({ email: email.toLowerCase() })
      .exec();

    return participant ? this.formatParticipantResponse(participant) : null;
  }

  private formatParticipantResponse(
    participant: ParticipantDocument,
  ): ParticipantResponseDto {
    return {
      id: (participant._id as string)?.toString(),
      email: participant.email,
      fullName: participant.fullName,
      phone: participant.phone || undefined,
      createdAt: participant.createdAt,
      updatedAt: participant.updatedAt,
    };
  }
}
