import { Module } from '@nestjs/common';
import { PollingService } from './polling.service';
import { PollingController } from './polling.controller';
import { polling, pollingSchema } from './schema/polling.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:polling.name,schema:pollingSchema}])],
  controllers: [PollingController],
  providers: [PollingService]
})
export class PollingModule {}
