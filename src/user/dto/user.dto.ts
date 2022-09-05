import { ApiProperty } from '@nestjs/swagger';

export class userDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  profilePic: string;
}
