import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/users/dto/users.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async register(registerDTO: RegisterDTO) {
        //const hashedPassword = await bcrypt.hash(registerDTO.password, 10)
        //const user = await this.usersService.createUser({ ...registerDTO, password: hashedPassword })
        const user = await this.usersService.createUser(registerDTO) // Will be hashed in the userService.createUser() method
        return UserDTO.toJson(user)
    }

    async login(loginDTO: LoginDTO) {
        const user = await this.usersService.findUserByUsername(loginDTO.username)
        console.log(loginDTO.password, user.password)
        if (await bcrypt.compare(loginDTO.password, user.password)) {
            const payload = { id: user.id }

            return {
                user: UserDTO.toJson(user),
                access_token: this.jwtService.sign(payload),
                expires_in: this.configService.get('JWT_EXPIRATION_TIME')
            }
        }
        else {
            throw new UnauthorizedException('Invalid credentials')
        }

    }
}
