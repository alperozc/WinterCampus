import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto/users.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {
    }

    async createUser(userDTO: CreateUserDTO) {
        const user = this.usersRepository.create(userDTO)

        // Check if user already exists
        const userExists = await this.usersRepository.findOneBy({ username: userDTO.username }).catch(() => null)
        if (userDTO.password) user.password = bcrypt.hashSync(userDTO.password, 10)
        if (userExists) throw new ConflictException('User already exists')

        return this.usersRepository.save(user)
    }

    async getUsers() {
        const users = await this.usersRepository.find({ relations: ['roles', 'students'] })
        return UserDTO.toJsonMap(users)
    }

    async getUser(id: number) {
        const user = await this.usersRepository.findOne({ where: { id: id }, relations: ['roles', 'students'] }).catch(() => null)
        if (!user) throw new NotFoundException('User not found')
        return UserDTO.toJson(user)
    }

    // DO NOT USE THIS METHOD IN REQUEST RETURN STATEMENTS
    async getUserByID(id: number) {
        const user = await this.usersRepository.findOne({ where: { id: id }, relations: ['roles'] },).catch(() => null)
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async findUserByUsername(username: string) {
        const user = await this.usersRepository.findOneBy({ username }).catch(() => null)
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async updateUser(id: number, userDTO: UpdateUserDTO) {
        const user = await this.usersRepository.findOneBy({ id }).catch(() => null)
        if (!user) throw new NotFoundException('User not found')
        if (userDTO.password) userDTO.password = bcrypt.hashSync(userDTO.password, 10)
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
