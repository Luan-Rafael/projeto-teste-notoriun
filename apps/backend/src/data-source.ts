import { getDatabaseConfig } from './config/database.config';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

export const AppDataSource = new DataSource(getDatabaseConfig(configService));
