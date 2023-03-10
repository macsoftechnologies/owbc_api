import { ApiProperty } from "@nestjs/swagger";

export class locationPointDto{
    @ApiProperty()
    locationPointId: string;
    @ApiProperty()
    locationPoint: string;
}