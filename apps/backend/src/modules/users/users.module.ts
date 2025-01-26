import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SwaggerModule } from '@nestjs/swagger';
import EmailService from '../../common/services/email.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), SwaggerModule],
    controllers: [UsersController],
    providers: [UsersService, EmailService],
    exports: [UsersService],
})
export class UsersModule {}
