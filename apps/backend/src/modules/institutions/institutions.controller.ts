import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { InstitutionService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { ApiParam } from '@nestjs/swagger';
import { CreateAddressDto } from '../addresses/dto/create-address.dto';
import { AddressService } from '../addresses/addresses.service';
import { ValidateCnpjPipe } from '../../common/pipes/cnpj-validation.pipe';

@Controller('institutions')
export class InstitutionController {
    constructor(
        private readonly institutionService: InstitutionService,
        private readonly addressService: AddressService,
    ) {}

    @Post('/:userId')
    @UsePipes(new ValidationPipe())
    async create(
        @Param('userId') userId: number,
        @Body(ValidateCnpjPipe)
        dto: {
            institution: CreateInstitutionDto;
            address: CreateAddressDto;
        },
    ) {
        await this.institutionService.create(userId, dto.institution);
        await this.addressService.create(userId, dto.address);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: Number })
    findOne(@Param('id') id: number) {
        return this.institutionService.findOneByUserId(id);
    }
}
