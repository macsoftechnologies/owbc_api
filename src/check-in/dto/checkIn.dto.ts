import { ApiProperty } from '@nestjs/swagger';
import { Date } from 'mongoose';

export class checkInDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  checkIn: string;
  @ApiProperty()
  startLocation: string;
  @ApiProperty()
  endLocation: string;
  @ApiProperty()
  startVisitDate: string;
  @ApiProperty()
  endVisitDate: string;
  @ApiProperty()
  startVisitTime: string;
  @ApiProperty()
  endVisitTime: string;
  @ApiProperty()
  capturedPhotos: [];
  @ApiProperty()
  assignmentId: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  locationPointId: string;
  @ApiProperty()
  images: [];
}
