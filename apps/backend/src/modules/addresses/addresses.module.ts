import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule } from '@nestjs/swagger';
import { AddressController } from './addresses.controller';
import { AddressService } from './addresses.service';
import { Address } from './address.entity';
import { User } from '../users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Address]),
        TypeOrmModule.forFeature([User]),
        SwaggerModule,
    ],
    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService],
})
export class AddressModule {}
