import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from '../users/user.entity';
import { UpdateLocationDto } from './dto/update-location.dto';

export class AddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(userId: number, dto: CreateAddressDto) {
        const user = await this.userRepository.findOneBy({ id: userId });

        const address = await this.addressRepository.findOneBy({
            user: {
                id: user.id,
            },
        });

        if (address) {
            await this.addressRepository.delete({
                id: address.id,
            });
        }

        const newAddress = this.addressRepository.create({
            ...dto,
            user,
        });
        return this.addressRepository.save(newAddress);
    }

    async findByUserId(userId: number) {
        return this.addressRepository.findBy({
            user: {
                id: userId,
            },
        });
    }

    async updateLocation(userId: number, dto: UpdateLocationDto) {
        const address = await this.addressRepository.findOneBy({
            user: {
                id: userId,
            },
        });

        address.latitude = dto.latitude;
        address.longitude = dto.longitude;

        await this.addressRepository.save(address);
    }
}
