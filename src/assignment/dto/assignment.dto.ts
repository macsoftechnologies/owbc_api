import { ApiProperty } from "@nestjs/swagger"

export class assignmentDto{
    @ApiProperty()
    assignmentId:string
    @ApiProperty()
    assignment:string

}
