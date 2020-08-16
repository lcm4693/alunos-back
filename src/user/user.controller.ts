import { User } from './../domain/user.domain';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('users')
export class UserController {

    @Post('/authenticate')
    criar(@Body('username') login: string, @Body('password') password: string): User {
    //   const retorno = await this.paisService.inserir(pais);
    //   return retorno;

        console.log(login);
        console.log(password);

        if(!login || !password || password !== '12345'){
            return;
        }

        console.log('Passou========');

        const user = new User();
        user.firstName = 'User 1';
        user.lastName = 'Sobrenome';
        user.password = password;
        user.token = 'EWTHSKADJKS';
        user.username = login;

        return user;
    }
}
