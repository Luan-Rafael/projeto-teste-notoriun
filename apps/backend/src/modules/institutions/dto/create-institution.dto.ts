import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateInstitutionDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('BR')
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
