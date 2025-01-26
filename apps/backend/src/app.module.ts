import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfigTypeOrmOptions } from './config/database.config';
import { InstitutionModule } from './modules/institutions/institutions.module';
import { AddressModule } from './modules/addresses/addresses.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getDatabaseConfigTypeOrmOptions,
        }),
        UsersModule,
        InstitutionModule,
        AddressModule,
    ],
    controllers: [],
})
export class AppModule {}
