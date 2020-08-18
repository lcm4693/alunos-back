import { Roles } from './../../roles.decorator';
import { RolesGuard } from './../../roles.guard';
import { EntradaUser } from '../../dto/entrada-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Controller, UseGuards, Get, Post, Body, SetMetadata } from '@nestjs/common';
import { RolesSystem } from 'src/constants/roles-system';

@Controller('users')
export class UsersController {
  constructor(private readonly service : UsersService) {}


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesSystem.ADMIN)
  @Post('/criar')
  async criar(@Body() user: EntradaUser) {
    console.log(user)
    const retorno = await this.service.inserir(user);
    return retorno;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesSystem.PROFESSOR)
  @Get('/')
  async getUsers() {
    console.log('Chamou a rota do users');
    const users = await this.service.getAll();
    return users;
  }
}
