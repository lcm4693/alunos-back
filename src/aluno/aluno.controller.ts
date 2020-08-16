import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { EntradaAluno } from '../dto/entrada-aluno.dto';
import { Aluno } from '../domain/aluno.domain';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('/alunos')
  getAlunos() {
    return this.alunoService.getAll();
  }

  @Post('/criar')
  criarAluno(@Body() aluno: EntradaAluno) {
    return this.alunoService.insert(aluno);
  }

  @Get('/remover/:codigoAluno')
  async removerAluno(@Param('codigoAluno') codigo): Promise<Number> {
    const numero = await this.alunoService.delete(codigo);
    return numero;
  }

  @Post('/observacao/criar')
  criarObservacao(@Body('codigoAluno') codigoAluno: string, @Body('observacoes') observacoes: string[]) {
    return this.alunoService.criarObservacoes(codigoAluno, observacoes);
  }

  @Post('/interesse/criar')
  criarInteresse(@Body('codigoAluno') codigoAluno: string, @Body('interesses') interesses: string[]) {
    return this.alunoService.criarInteresses(codigoAluno, interesses);
  }
  
  @Get('/codigo/:codigoAluno')
  async buscarAlunoPorCodigo(@Param('codigoAluno') codigoAluno: string): Promise<Aluno> {
    return this.alunoService.buscarAlunoPorCodigo(codigoAluno);
  }

  @Get('/:nomeAluno')
  async buscarAluno(@Param('nomeAluno') nomeAluno): Promise<Aluno[]> {
    return this.alunoService.buscarAlunos(nomeAluno);
  }

}
