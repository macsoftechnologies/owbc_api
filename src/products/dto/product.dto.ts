import { ApiProperty } from "@nestjs/swagger";

export class  productDto{
    @ApiProperty()
    ProductId:string
    @ApiProperty()
    productName:string
    @ApiProperty()
    price:string
    @ApiProperty()
    specifications:{}
    
}