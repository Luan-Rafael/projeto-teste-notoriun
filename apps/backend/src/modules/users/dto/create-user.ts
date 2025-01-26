import {
    IsString,
    IsEmail,
    IsOptional,
    IsNumber,
    IsPhoneNumber,
    Length,
} from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'O nome deve ser válido.' })
    @Length(8, 50, { message: 'O nome deve ser válido.' })
    name: string;

    @IsPhoneNumber('BR', {
        message: 'O número de telefone deve ser válido para o Brasil.',
    })
    phone: string;

    @IsEmail({}, { message: 'O e-mail deve ser válido.' })
    email: string;

    @IsOptional()
    @IsNumber()
    institution_id?: number;

    @IsOptional()
    @IsNumber()
    address_id?: number;
}
