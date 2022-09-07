import { ApiProperty } from "@nestjs/swagger"

export class clientDto{
    @ApiProperty()
    clientId:string
    @ApiProperty()
    clientName:string
     @ApiProperty()
    clientPhNumber:string
    @ApiProperty()
    Address:[]
}