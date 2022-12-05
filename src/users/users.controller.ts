import { Body, Controller, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get('')
    async getUsers() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.usersService.getUser(id)
    }

    @Post('')
    @UsePipes(ValidationPipe)
    async createUser(@Body() userDTO: CreateUserDTO) {
        return this.usersService.createUser(userDTO)
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() userDTO: UpdateUserDTO) {
        return this.usersService.updateUser(id, userDTO)
    }



}