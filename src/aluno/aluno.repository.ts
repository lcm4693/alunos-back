import { Injectable, NotFoundException } from '@nestjs/common';
import { Aluno, AlunoSchema } from '../domain/aluno.domain';
import { Pais } from '../domain/pais.domain';
import { EntradaAluno } from '../dto/entrada-aluno.dto';
import { LinkService } from '../link/link.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaisService } from 'src/pais/pais.service';
import { EntradaPais } from 'src/dto/entrada-pais.dto';
import { AlunoService } from './aluno.service';

@Injectable()
export class AlunoRepository {
  constructor(
    @InjectModel(Aluno.name) private readonly alunoModel: Model<Aluno>,
    private readonly paisService: PaisService,
  ) {}

  async buscarAlunos(nomeAluno: string): Promise<Aluno[]> {
    let alunos: Aluno[] = await this.alunoModel
      .find({ nome: new RegExp(nomeAluno, 'i') })
      .exec();

    if (alunos.length === 0) {
      throw new NotFoundException(nomeAluno);
    }

    alunos = await this.montarObjetoAluno(alunos);

    return alunos;
  }

  async buscarAlunoPorCodigo(codigoAluno: string): Promise<Aluno> {
    let aluno = await this.alunoModel.findById(codigoAluno).exec();

    if (!aluno) {
      throw new NotFoundException('Aluno ' + codigoAluno + ' não encontrado');
    }

    aluno = await this.montarObjetoAluno(aluno);

    return aluno;
  }

  async criarObservacoes(
    codigoAluno: string,
    observacoes: string[],
  ): Promise<void> {
    const aluno = await this.buscarAlunoPorCodigo(codigoAluno);

    if (!aluno) {
      throw new NotFoundException('Aluno ' + codigoAluno + ' não encontrado');
    }

    if (!aluno.observacoes) {
      aluno.observacoes = new Array();
    }

    for(const observacao of observacoes){
      aluno.observacoes.push(observacao);
    }

    this.insertOrUpdate(aluno);
  }

  async criarInteresses(
    codigoAluno: string,
    interesses: string[],
  ): Promise<void> {
    const aluno = await this.buscarAlunoPorCodigo(codigoAluno);
    
    if (!aluno.interesses) {
      aluno.interesses = new Array();
    }

    for(const interesse of interesses){
      aluno.interesses.push(interesse);
    }

    this.insertOrUpdate(aluno);
  }

  async insertOrUpdate(aluno: Aluno): Promise<Aluno> {
    const managed = new this.alunoModel(aluno);
    return managed.save();
  }

  async getAll(): Promise<Aluno[]> {
    let alunos = await this.alunoModel.find().exec();
    alunos = await this.montarObjetoAluno(alunos);

    return alunos;
  }

  private async montarObjetoAluno(objeto: any) {
    if (objeto) {
      if (objeto instanceof Array) {
        for (let aluno of objeto) {
          aluno = await this.buildUmAluno(aluno);
        }
      } else {
        objeto = await this.buildUmAluno(objeto);
      }
    }
    return objeto;
  }

  private async buildUmAluno(aluno: any) {
    const pais = await this.paisService.buscarPaisPorId(aluno.pais);
    aluno.pais = pais;
    return aluno;
  }
}
