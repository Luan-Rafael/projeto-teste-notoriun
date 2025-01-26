import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule } from '@nestjs/swagger';
import { InstitutionController } from './institutions.controller';
import { InstitutionService } from './institutions.service';
import { Institution } from './institution.entity';
import { AddressService } from '../addresses/addresses.service';
import { Address } from '../addresses/address.entity';
import { User } from '../users/user.entity';
import { ValidateCnpjPipe } from '../../common/pipes/cnpj-validation.pipe';

@Module({
    imports: [
        TypeOrmModule.forFeature([Institution]),
        TypeOrmModule.forFeature([Address]),
        TypeOrmModule.forFeature([User]),
        SwaggerModule,
    ],
    controllers: [InstitutionController],
    providers: [InstitutionService, AddressService, ValidateCnpjPipe],
    exports: [InstitutionService],
})
export class InstitutionModule {}
