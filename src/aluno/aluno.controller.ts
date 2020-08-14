import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { EntradaAluno } from '../dto/entrada-aluno.dto';
import { Aluno } from '../domain/aluno.domain';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}
  
  @Get('/alunos')
  getAlunos() {
    return this.alunoService.getAll();
  }

  @Post('/criar')
  criarAluno(@Body() aluno: EntradaAluno) {
    return this.alunoService.insert(aluno);
  }

  @Post('/observacao/criar')
  criarObservacao(@Body('codigoAluno') codigoAluno: number, @Body('observacao') observacao: string) {
    return this.alunoService.criarObservacao(codigoAluno, observacao);
  }
  
  @Get('/codigo/:codigoAluno')
  buscarAlunoPorCodigo(@Param('codigoAluno') codigoAluno: number): Aluno {
    return this.alunoService.buscarAlunoPorCodigo(codigoAluno);
  }

  @Get('/:nomeAluno')
  buscarAluno(@Param('nomeAluno') nomeAluno): Aluno[] {
    return this.alunoService.buscarAluno(nomeAluno);
  }

}
