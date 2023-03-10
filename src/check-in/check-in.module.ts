import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInController } from './check-in.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { checkIn, checkInSchema } from './schema/checkIn.schema';
import { locationPoint, locationPointSchema } from './schema/locationPoint.shema';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: checkIn.name, schema: checkInSchema },{ name: locationPoint.name, schema: locationPointSchema }]),
  ],
  controllers: [CheckInController],
  providers: [CheckInService, SharedService],
})
export class CheckInModule {}
