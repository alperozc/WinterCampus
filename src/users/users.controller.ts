import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get('')
    async getUsers() {
        return 'Hello World';
    }

}
