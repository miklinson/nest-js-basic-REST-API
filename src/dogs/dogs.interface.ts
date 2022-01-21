import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class DogsModel {
    @ApiPropertyOptional({ type: Number })
    id?: number;
    @ApiProperty({ type: String, format: 'date-time' })
    date: Date;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    category: string;
}
