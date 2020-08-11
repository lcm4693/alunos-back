import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { EntradaAluno } from '../dto/entrada-aluno.dto';
import { Aluno } from '../domain/aluno.domain';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post('/criar')
  criarAluno(@Body() aluno: EntradaAluno) {
    return this.alunoService.insert(aluno);
  }

  @Get('/:nomeAluno')
  buscarAluno(@Param('nomeAluno') nomeAluno): Aluno[] {
    return this.alunoService.buscarAluno(nomeAluno);
  }

  @Get('/alunos')
  getAlunos() {
    return this.alunoService.getAll();
  }
}
