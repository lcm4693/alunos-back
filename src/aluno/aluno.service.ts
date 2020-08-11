import { Injectable, NotFoundException } from '@nestjs/common';
import { Aluno } from '../domain/aluno.domain';
import { Pais } from '../domain/pais.domain';
import { EntradaAluno } from '../dto/entrada-aluno.dto';

@Injectable()
export class AlunoService {
  
  private alunos = new Array();
  
  constructor(){
    const aluno = new Aluno('Maciej', new Pais(1, 'Polônia'));
    const aluno2 = new Aluno('Klaidas', new Pais(2, 'Lituânia'));
  
    this.alunos.push(aluno);
    this.alunos.push(aluno2);
  }

  buscarAluno(nomeAluno: string): Aluno[] {
    let retorno: Aluno[] = new Array();
    
    for(const value of this.alunos){
      if(value.nome.toUpperCase().startsWith(nomeAluno.toUpperCase())){
        retorno.push(value);
      }
    }

    if(retorno.length === 0){
      throw new NotFoundException(nomeAluno);
    }
   
    return retorno;
  }

  insert(alunoEntrada: EntradaAluno): Aluno {
    const pais = new Pais(1, alunoEntrada.pais);
    const aluno = new Aluno(alunoEntrada.nome, pais);

    this.alunos.push(aluno);

    return aluno;
  }

  getAll(): Aluno[] {
    return this.alunos;
  }
}
