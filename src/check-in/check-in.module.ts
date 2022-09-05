import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInController } from './check-in.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { checkIn, checkInSchema } from './schema/checkIn.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: checkIn.name, schema: checkInSchema }]),
  ],
  controllers: [CheckInController],
  providers: [CheckInService],
})
export class CheckInModule {}
