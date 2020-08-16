import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Aluno, AlunoSchema } from '../domain/aluno.domain';
import { Pais } from '../domain/pais.domain';
import { EntradaAluno } from '../dto/entrada-aluno.dto';
import { LinkService } from '../link/link.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaisService } from 'src/pais/pais.service';
import { EntradaPais } from 'src/dto/entrada-pais.dto';
import { AlunoRepository } from './aluno.repository';

@Injectable()
export class AlunoService {
  constructor(
    private readonly paisService: PaisService,
    private readonly alunoRepository: AlunoRepository,
  ) {}

  async buscarAlunos(nomeAluno: string): Promise<Aluno[]> {
    const alunos: Aluno[] = await this.alunoRepository.buscarAlunos(nomeAluno);
    return alunos;
  }

  async buscarAlunoPorCodigo(codigoAluno: string): Promise<Aluno> {
    const aluno = await this.alunoRepository.buscarAlunoPorCodigo(codigoAluno);
    return aluno;
  }

  async criarObservacoes(
    codigoAluno: string,
    observacoes: string[],
  ): Promise<void> {
    await this.alunoRepository.criarObservacoes(codigoAluno, observacoes);
  }

  async criarInteresses(
    codigoAluno: string,
    interesses: string[],
  ): Promise<void> {
    await this.alunoRepository.criarInteresses(codigoAluno, interesses);
  }

  async insert(alunoEntrada: EntradaAluno): Promise<Aluno> {
    const pais = await this.paisService.buscarPaisPorId(alunoEntrada.pais._id);

    if (!pais) {
      throw new NotFoundException('País não encontrado');
    }

    const aluno = new Aluno(alunoEntrada.nome, pais);
    return this.alunoRepository.insertOrUpdate(aluno);
  }

  async delete(codigoAluno: string): Promise<Number> {
    const numeroRemovidos = await this.alunoRepository.delete(codigoAluno);
    if(numeroRemovidos < 1){
      throw new ForbiddenException('Aluno ' + codigoAluno + ' não encontrado');
    }
    return numeroRemovidos;
  }

  async getAll(): Promise<Aluno[]> {
    const alunos = await this.alunoRepository.getAll();
    return alunos;
  }
}
