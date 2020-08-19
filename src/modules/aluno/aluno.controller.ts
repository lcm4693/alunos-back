import { RolesSystem } from 'src/constants/roles-system';
import { Roles } from './../../roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { EntradaAluno } from '../../dto/entrada-aluno.dto';
import { Aluno } from '../../domain/aluno.domain';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}
  
  @UseGuards(JwtAuthGuard)
  @Roles(RolesSystem.ADMIN, RolesSystem.PROFESSOR)
  @Get('/alunos')
  getAlunos(@Request() req) {
    return this.alunoService.getAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesSystem.ADMIN, RolesSystem.PROFESSOR)
  @Post('/criar')
  criarAluno(@Body() aluno: EntradaAluno) {
    return this.alunoService.insert(aluno);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesSystem.ADMIN, RolesSystem.PROFESSOR)
  @Get('/remover/:codigoAluno')
  async removerAluno(@Param('codigoAluno') codigo): Promise<Number> {
    const numero = await this.alunoService.delete(codigo);
    return numero;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesSystem.ADMIN, RolesSystem.PROFESSOR)
  @Post('/observacao/criar')
  criarObservacao(@Body('codigoAluno') codigoAluno: string, @Body('observacoes') observacoes: string[]) {
    return this.alunoService.criarObservacoes(codigoAluno, observacoes);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesSystem.ADMIN, RolesSystem.PROFESSOR)
  @Post('/interesse/criar')
  criarInteresse(@Body('codigoAluno') codigoAluno: string, @Body('interesses') interesses: string[]) {
    return this.alunoService.criarInteresses(codigoAluno, interesses);
  }
  
  @UseGuards(JwtAuthGuard)
  @Roles(RolesSystem.ADMIN, RolesSystem.PROFESSOR)
  @Get('/codigo/:codigoAluno')
  async buscarAlunoPorCodigo(@Param('codigoAluno') codigoAluno: string): Promise<Aluno> {
    return this.alunoService.buscarAlunoPorCodigo(codigoAluno);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesSystem.ADMIN, RolesSystem.PROFESSOR)
  @Get('/:nomeAluno')
  async buscarAluno(@Param('nomeAluno') nomeAluno): Promise<Aluno[]> {
    return this.alunoService.buscarAlunos(nomeAluno);
  }

}
