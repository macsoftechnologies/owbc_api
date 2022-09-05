import { ApiProperty } from '@nestjs/swagger';

export class checkInDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  profilePic: string;
  @ApiProperty()
  checkIn: string;
}
