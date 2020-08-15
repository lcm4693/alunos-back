import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaisService } from './pais.service';
import { Pais } from 'src/domain/pais.domain';
import { EntradaPais } from 'src/dto/entrada-pais.dto';

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Get('/paises')
  getAlunos() {
    return this.paisService.getAll();
  }

  @Get('/:partialPais')
  async buscarPais(@Param('partialPais') nomePais: string): Promise<Pais[]> {
    return this.paisService.buscarPaisesPorNomeParcial(nomePais);
  }

  @Post('/criar')
  async criar(@Body() pais: EntradaPais) {
    return await this.paisService.inserir(pais);
  }
}
