import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {

    @ApiProperty()
    clientId: string;

    @ApiProperty()
    grantType: string;
}
