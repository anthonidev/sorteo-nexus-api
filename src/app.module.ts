import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
import { ParticipantsModule } from './participants/participants.module';
import { SeedsModule } from './seed/seeds.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: envs.MONGO_URI,
          dbName: envs.MONGO_DB,
        };
      },
    }),
    ParticipantsModule,
    SeedsModule,
  ],
})
export class AppModule {}
