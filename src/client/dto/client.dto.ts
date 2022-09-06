import { ApiProperty } from "@nestjs/swagger"

export class clientDto{
    @ApiProperty()
    clientId:string
    @ApiProperty()
    clientName:string
    @ApiProperty()
    Adress:[]
    @ApiProperty()
    clientPhNumber:string
}