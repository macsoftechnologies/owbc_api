import { ApiProperty } from "@nestjs/swagger"

export class checkoutDto{
    @ApiProperty()
    checkoutId:string
    @ApiProperty()
    checkout:string
    @ApiProperty()
    userID:string
   

}