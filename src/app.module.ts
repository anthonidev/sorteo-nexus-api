import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.mongoUri, {
      dbName: envs.mongoDb,
    }),
    ParticipantsModule,
  ],
})
export class AppModule {}
