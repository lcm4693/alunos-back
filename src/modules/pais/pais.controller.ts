import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaisService } from './pais.service';
import { Pais } from 'src/domain/pais.domain';
import { EntradaPais } from 'src/dto/entrada-pais.dto';

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/paises')
  getAlunos() {
    return this.paisService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:partialPais')
  async buscarPais(@Param('partialPais') nomePais: string): Promise<Pais[]> {
    return this.paisService.buscarPaisesPorNomeParcial(nomePais);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/criar')
  async criar(@Body() pais: EntradaPais) {
    const retorno = await this.paisService.inserir(pais);
    return retorno;
  }
}
