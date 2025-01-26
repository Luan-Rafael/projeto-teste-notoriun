import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ConfirmEmailDto } from './dto/confirm-email';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAll() {
        const users = await this.usersService.getAll();
        return { users };
    }

    @Get('/:id')
    @ApiParam({ name: 'id', type: 'number' })
    async get(@Param('id') id: number) {
        const user = await this.usersService.findById(id);
        return { user };
    }

    @Post()
    @HttpCode(201)
    @ApiBody({ type: CreateUserDto })
    async post(@Body() userCreate: CreateUserDto) {
        const user = await this.usersService.create(userCreate);
        return { user };
    }

    @Post('/:id/confirm')
    @ApiBody({
        type: ConfirmEmailDto,
    })
    @ApiParam({ name: 'id', type: 'number' })
    @HttpCode(201)
    async confirm(@Param('id') id: number, @Body('code') code: string) {
        await this.usersService.confirm(id, code);
    }

    @Post('/:id/resendCode')
    @HttpCode(204)
    @ApiParam({ name: 'id', type: 'number' })
    async resendCode(@Param('id') id: number) {
        await this.usersService.updateCode(id, null);
    }
}
