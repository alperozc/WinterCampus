import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDTO, GetRoleDTO, UpdateRoleDTO } from './dto/roles.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>) { }

    async getRoles() {
        const roles = await this.roleRepository.find()
        return roles
    }

    async getRole(id: number) {
        const role = await this.roleRepository.findOne({ where: { id: id } }).catch(() => null)
        if (!role) throw new NotFoundException('Role not found')
        return role
    }

    async createRole(role: CreateRoleDTO) {
        // Check if role already exists
        const roleExists = await this.roleRepository.findOne({ where: { name: role.name } }).catch(() => null)
        if (roleExists) throw new NotFoundException('Role already exists')
        return this.roleRepository.save(role);
    }

    async updateRole(id: number, role: UpdateRoleDTO) {
        const roleToUpdate = await this.roleRepository.findOne({ where: { id: id } }).catch(() => null)
        if (!roleToUpdate) throw new NotFoundException('Role not found')
        return this.roleRepository.save(role);
    }

    async deleteRole(id: number) {
        console.log('id', id)
        const role = await this.roleRepository.findOne({ where: { id: id } }).catch(() => null)
        if (!role) throw new NotFoundException('Role not found')
        return this.roleRepository.delete(id);
    }

    async addRoleToUser(userId: number, roleDTO: GetRoleDTO) {
        const role = await this.roleRepository.findOne({ where: { id: roleDTO.id } }).catch(() => null)
        if (!role) throw new NotFoundException('Role not found')

        const user = await this.roleRepository.manager.findOne('user', { where: { id: userId }, relations: ['roles'] }).catch(() => null)
        if (!user) throw new NotFoundException('User not found')

        if (user.roles?.find(r => r.id === role.id)) throw new NotFoundException('User already has this role')

        await this.roleRepository.createQueryBuilder()
            .relation(Role, 'users')
            .of(role)
            .add(userId)

        return { message: 'Role added to user' }
    }

    async removeRoleFromUser(userId: number, roleId: number) {
        const role = await this.roleRepository.findOne({ where: { id: roleId } }).catch(() => null)
        if (!role) throw new NotFoundException('Role not found')


        const user = await this.roleRepository.manager.findOne('user', { where: { id: userId }, relations: ['roles'] }).catch(() => null)
        if (!user) throw new NotFoundException('User not found')

        if (!user.roles?.find(r => r.id === role.id)) throw new NotFoundException('User does not have this role')

        await this.roleRepository.createQueryBuilder()
            .relation(Role, 'users')
            .of(role)
            .remove(userId)

        return { message: 'Role removed from user' }
    }
}
