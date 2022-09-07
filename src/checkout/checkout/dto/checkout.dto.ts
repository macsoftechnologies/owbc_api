import { ApiProperty } from '@nestjs/swagger';

export class checkoutDto {
  @ApiProperty()
  checkoutId: string;
  @ApiProperty()
  userID: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  date: string;
  @ApiProperty()
  time: string;
}
