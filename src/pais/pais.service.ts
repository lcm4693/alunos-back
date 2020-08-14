import { Injectable, NotFoundException } from '@nestjs/common';
import { Aluno, AlunoSchema } from '../domain/aluno.domain';
import { Pais } from '../domain/pais.domain';
import { EntradaAluno } from '../dto/entrada-aluno.dto';
import { LinkService } from '../link/link.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaisService {
  
  private alunos = new Array();

  constructor(@InjectModel(Pais.name) private readonly paisModel: Model<Pais>){}

//   buscarAluno(nomeAluno: string): Aluno[] {
//     let retorno: Aluno[] = new Array();
    
//     for(const value of this.alunos){
//       if(value.nome.toUpperCase().startsWith(nomeAluno.toUpperCase())){
//         retorno.push(value);
//       }
//     }

//     if(retorno.length === 0){
//       throw new NotFoundException(nomeAluno);
//     }
   
//     return retorno;
//   }

  async findById(id: string): Promise<Pais> {

    const pais = await this.paisModel.findById(id).exec();

    if(!pais){
        throw new NotFoundException('País não encontrado');
    }

    return pais;
  }

  async find(nomePais: string): Promise<Pais> {

    let pais = await this.paisModel.findOne({nome: nomePais}).exec();

    if(!pais){
        this.insert(nomePais);
    }

    return pais;
  }

  async insert(nomePais: string): Promise<Pais> {
    const managed = new this.paisModel(new Pais(nomePais));
    return await managed.save();
  }
}
