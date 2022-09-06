import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { client, clientSchema } from './schema/client.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:client.name,schema:clientSchema}])],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
