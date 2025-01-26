import { Injectable } from '@nestjs/common';
import { Institution } from './institution.entity';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class InstitutionService {
    constructor(
        @InjectRepository(Institution)
        private readonly institutionRepository: Repository<Institution>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(userId: number, createInstitutionDto: CreateInstitutionDto) {
        const user = await this.userRepository.findOneBy({ id: userId });

        const institution = await this.institutionRepository.findOneBy({
            user: { id: userId },
        });

        if (institution) {
            await this.institutionRepository.delete({
                id: institution.id,
            });
        }

        const newInstitution = this.institutionRepository.create({
            ...createInstitutionDto,
            user,
        });
        return this.institutionRepository.save(newInstitution);
    }

    async findOneByUserId(userId: number) {
        return this.institutionRepository.findOneBy({
            user: {
                id: userId,
            },
        });
    }
}
