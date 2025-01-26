import { IsNotEmpty } from 'class-validator';

export class UpdateLocationDto {
    @IsNotEmpty()
    latitude: number;

    @IsNotEmpty()
    longitude: number;
}
