import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Participant,
  ParticipantSchema,
} from '../participants/schemas/participant.schema';
import { ParticipantsSeed } from './participants.seed';
import { SeedsService } from './seeds.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Participant.name,
        schema: ParticipantSchema,
      },
    ]),
  ],
  providers: [ParticipantsSeed, SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
