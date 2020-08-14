import { Injectable, NotFoundException } from '@nestjs/common';
import { Aluno, AlunoSchema } from '../domain/aluno.domain';
import { Pais } from '../domain/pais.domain';
import { EntradaAluno } from '../dto/entrada-aluno.dto';
import { LinkService } from '../link/link.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaisService } from 'src/pais/pais.service';

@Injectable()
export class AlunoService {
  private alunos = new Array();

  constructor(
    @InjectModel(Aluno.name) private readonly alunoModel: Model<Aluno>,
    @InjectModel(Pais.name) private readonly paisModel: Model<Pais>,
    private readonly linkService: LinkService,
    private readonly paisService: PaisService,
  ) {
    // const aluno = new Aluno('Maciej', new Pais(1, 'Polônia'));
    // const aluno2 = new Aluno('Klaidas', new Pais(2, 'Lituânia'));

    // aluno.codigoAluno = 1;
    // aluno2.codigoAluno = 2;
    this.getAll();
    // aluno.links = linkService.getAll();

    // this.alunos.push(aluno);
    // this.alunos.push(aluno2);
  }

  buscarAluno(nomeAluno: string): Aluno[] {
    let retorno: Aluno[] = new Array();

    for (const value of this.alunos) {
      if (value.nome.toUpperCase().startsWith(nomeAluno.toUpperCase())) {
        retorno.push(value);
      }
    }

    if (retorno.length === 0) {
      throw new NotFoundException(nomeAluno);
    }

    return retorno;
  }

  buscarAlunoPorCodigo(codigoAluno: number): Aluno {
    for (const value of this.alunos) {
      if (value.codigoAluno == codigoAluno) {
        return value;
      }
    }

    throw new NotFoundException(codigoAluno);
  }

  criarObservacao(codigoAluno: number, observacao: string): void {
    const aluno = this.buscarAlunoPorCodigo(codigoAluno);

    if (!aluno) {
      throw new NotFoundException('Aluno ' + codigoAluno + ' não encontrado');
    }

    // if(!aluno.observacoes){
    //   aluno.observacoes = new Array();
    // }

    // aluno.observacoes.push(observacao);
  }

  async insert(alunoEntrada: EntradaAluno): Promise<Aluno> {
    // const man = new this.paisModel(new Pais(alunoEntrada.pais));
    // const pais = await man.save();

    const pais = await this.paisService.find(alunoEntrada.pais);

    const aluno = new Aluno(alunoEntrada.nome, pais);

    aluno.codigoAluno = this.alunos.length + 1;

    const managed = new this.alunoModel(aluno);
    this.alunos.push(aluno);
    return managed.save();
  }

  async getAll(): Promise<Aluno[]> {
    this.alunos = await this.alunoModel.find().exec();

    for(const aluno of this.alunos){
      const pais = await this.paisService.findById(aluno.pais);
      aluno.pais = pais;
    }
    return this.alunos;
  }
}
