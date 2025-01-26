import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export function getDatabaseConfig(
    configService: ConfigService,
): DataSourceOptions {
    return {
        type: 'postgres',
        host: configService.get<string>('DB_HOST', process.env.DB_HOST),
        port: configService.get<number>('DB_PORT', Number(process.env.DB_PORT)),
        username: configService.get<string>(
            'DB_USERNAME',
            process.env.DB_USERNAME,
        ),
        password: configService.get<string>(
            'DB_PASSWORD',
            process.env.DB_PASSWORD,
        ),
        database: configService.get<string>('DB_NAME', process.env.DB_NAME),
        synchronize: true, // Defina como false em produção.
        migrationsRun: true,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        migrations: [__dirname + '/src/migrations/*.{js,ts}'],
    };
}

export const getDatabaseConfigTypeOrmOptions = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    ...getDatabaseConfig(configService),
});
