import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { AddressService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post('/:userId')
    @ApiParam({ name: 'userId', type: Number })
    @ApiBody({ type: CreateAddressDto })
    async create(
        @Param('userId') userId: number,
        @Body() body: CreateAddressDto,
    ) {
        const address = await this.addressService.create(userId, body);
        return {
            address,
        };
    }

    @Get('/:userId')
    @ApiParam({ name: 'userId', type: Number })
    async findByUserId(@Param('userId') userId: number) {
        const address = await this.addressService.findByUserId(userId);
        return {
            address,
        };
    }

    @Put('/:userId')
    @ApiParam({ name: 'userId', type: Number })
    @HttpCode(201)
    async updateLocation(
        @Param('userId') userId: number,
        @Body() body: UpdateLocationDto,
    ) {
        await this.addressService.updateLocation(userId, body);
    }
}
