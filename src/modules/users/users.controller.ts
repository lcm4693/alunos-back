import { EntradaUser } from '../../dto/entrada-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly service : UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/criar')
  async criar(@Body() user: EntradaUser) {
    const retorno = await this.service.inserir(user);
    return retorno;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAlunos() {
    return this.service.getAll();
  }
}
