import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import * as crypto from 'crypto';
import EmailService from '../../common/services/email.service';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly emailService: EmailService,
    ) {}

    findById(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id: id });
    }

    getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({
            email: createUserDto.email,
        });

        if (user) {
            throw new HttpException(
                'Email já foi cadastrado',
                HttpStatus.BAD_REQUEST,
            );
        }

        const userCreated = this.userRepository.create(createUserDto);
        return this.userRepository.save(userCreated);
    }

    async updateCode(userId: number, value: string | null) {
        await this.userRepository.update(userId, { code: value });
    }

    @Interval(10000)
    async sendPendingEmailConfirmation() {
        const users = await this.userRepository.find();

        for (const user of users) {
            if (!user.code) {
                await this.generateAndSendCode(user.email);
            }
        }
    }

    async generateAndSendCode(email: string): Promise<void> {
        const code = crypto.randomInt(100000, 999999).toString();

        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            throw new HttpException(
                'Usuário não encontrado',
                HttpStatus.BAD_REQUEST,
            );
        }

        user.code = code;
        user.code_expires = new Date(Date.now() + 1000 * 60 * 5);

        await this.userRepository.save(user);

        await this.emailService.sendMail({
            to: email,
            subject: 'Código para verificação',
            text: `Seu código para verificação é <b>${code}</b>`,
        });
    }

    async confirm(id: number, code: string) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new HttpException(
                'Usuário não encontrado',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (user.code !== code) {
            throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
        }

        if (user.code_expires < new Date()) {
            throw new HttpException('Código expirado', HttpStatus.BAD_REQUEST);
        }

        user.confirmed_at = new Date();

        await this.userRepository.save(user);
    }

    async delete(id: number) {
        await this.userRepository.delete(id);
    }

    async update(id: number, user: UpdateUserDto) {
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }
}
