import {
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    street: string;

    @IsOptional()
    @IsString()
    neighborhood?: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    zipCode: string;

    @IsOptional()
    @IsString()
    number: string;

    @IsOptional()
    @IsString()
    complement?: string;

    @IsNotEmpty()
    @IsLatitude()
    latitude: number;

    @IsNotEmpty()
    @IsLongitude()
    longitude: number;
}
