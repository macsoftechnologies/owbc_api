import { ApiProperty } from '@nestjs/swagger';

export class adminDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phoneNumber: string;
}
