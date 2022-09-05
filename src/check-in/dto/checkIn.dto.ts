import { ApiProperty } from '@nestjs/swagger';
import { Date } from 'mongoose';

export class checkInDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  profilePic: string;
  @ApiProperty()
  checkIn: string;
}
