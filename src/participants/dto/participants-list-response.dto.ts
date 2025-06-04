import { ParticipantResponseDto } from './participant-response.dto';

export class ParticipantsListResponseDto {
  participants: ParticipantResponseDto[];
  total: number;
  message: string;
}
