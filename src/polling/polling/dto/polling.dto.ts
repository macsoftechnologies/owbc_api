import { ApiProperty } from "@nestjs/swagger"

export class pollingDto{
    @ApiProperty()
    pollId:string
    @ApiProperty()
    longitude:string
    @ApiProperty()
    latitude:string
    @ApiProperty()
    userId:string
}