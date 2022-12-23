import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto/users.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {
    }

    async createUser(userDTO: CreateUserDTO) {
        const user = this.usersRepository.create(userDTO)

        return this.usersRepository.save(user).catch(err => {
            if (err.code === 11000) {
                throw new ConflictException('User already exists')
            }
        });
    }

    async getUsers() {
        const users = await this.usersRepository.find()
        return UserDTO.toJsonMap(users)
    }

    async getUser(id: number) {
        const user = await this.usersRepository.findOneBy({ id }).catch(() => null)
        if (!user) throw new NotFoundException('User not found')
        return UserDTO.toJson(user)
    }

    async updateUser(id: number, userDTO: UpdateUserDTO) {
        const user = await this.usersRepository.findOneBy({ id }).catch(() => null)
        if (!user) throw new NotFoundException('User not found')
        this.usersRepository.merge(user, UserDTO.toUpdateJson(userDTO))
        const saved = await this.usersRepository.save(user)
        return UserDTO.toJson(saved)
    }

    async deleteUser(id: number) {
        const user = await this.usersRepository.findOneBy({ id }).catch(() => null)
        if (!user) throw new NotFoundException('User not found')
        return this.usersRepository.delete(id as any)
    }

}
