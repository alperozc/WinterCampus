import { Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { RegisterDTO } from './dto/register.dto';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() body: RegisterDTO) {
        return this.authService.register(body);
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() body: LoginDTO) {
        return this.authService.login(body);
    }

}
