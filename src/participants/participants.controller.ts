import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantResponseDto } from './dto/participant-response.dto';
import { ParticipantsListResponseDto } from './dto/participants-list-response.dto';

@Controller('participants')
export class ParticipantsController {
  private readonly logger = new Logger(ParticipantsController.name);

  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    createParticipantDto: CreateParticipantDto,
  ): Promise<{
    success: boolean;
    message: string;
    data: ParticipantResponseDto;
  }> {
    this.logger.log(`POST /participants - Registrando nuevo participante`);

    try {
      const participant =
        await this.participantsService.create(createParticipantDto);

      return {
        success: true,
        message: 'Participante registrado exitosamente en el sorteo',
        data: participant,
      };
    } catch (error) {
      this.logger.error(`Error en POST /participants: ${error.message}`);
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: ParticipantsListResponseDto;
  }> {
    this.logger.log(`GET /participants - Obteniendo lista de participantes`);

    try {
      const result = await this.participantsService.findAll();

      return {
        success: true,
        message: 'Lista de participantes obtenida exitosamente',
        data: result,
      };
    } catch (error) {
      this.logger.error(`Error en GET /participants: ${error.message}`);
      throw error;
    }
  }

  @Get('count')
  @HttpCode(HttpStatus.OK)
  async getCount(): Promise<{
    success: boolean;
    message: string;
    data: { total: number };
  }> {
    this.logger.log(
      `GET /participants/count - Obteniendo contador de participantes`,
    );

    try {
      const total = await this.participantsService.getParticipantCount();

      return {
        success: true,
        message: 'Contador de participantes obtenido exitosamente',
        data: { total },
      };
    } catch (error) {
      this.logger.error(`Error en GET /participants/count: ${error.message}`);
      throw error;
    }
  }
}
