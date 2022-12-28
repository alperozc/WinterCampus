import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';
import { UsersService } from './users.service';
import { RolesService } from 'src/roles/roles.service';
import { GetRoleDTO } from 'src/roles/dto/roles.dto';
import { hasRoles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import JwtGuard from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService, private roleService: RolesService) { }

    @Get('')
    async getUsers() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        return this.usersService.getUser(id)
    }

    @hasRoles('SYSTEM_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Post('')
    @UsePipes(ValidationPipe)
    async createUser(@Body() userDTO: CreateUserDTO) {
        return this.usersService.createUser(userDTO)
    }

    @hasRoles('SYSTEM_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Put(':id')
    @UsePipes(ValidationPipe)
    async updateUser(@Param('id') id: number, @Body() userDTO: UpdateUserDTO) {
        return this.usersService.updateUser(id, userDTO)
    }

    @hasRoles('SYSTEM_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id).then(() => 'User deleted')
    }

    // Roles

    @hasRoles('SYSTEM_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Post(':id/roles')
    async addRoleToUser(@Param('id') id: number, @Body() role: GetRoleDTO) {
        return this.roleService.addRoleToUser(id, role)
    }

    @hasRoles('SYSTEM_ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id/roles/:roleId')
    async removeRoleFromUser(@Param('id') id: number, @Param('roleId') roleId: number) {
        return this.roleService.removeRoleFromUser(id, roleId)
    }





}
