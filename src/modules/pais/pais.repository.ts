import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pais } from './../../domain/pais.domain';
import { Model } from 'mongoose';
import { EntradaPais } from './../../dto/entrada-pais.dto';

@Injectable()
export class PaisRepository {
  constructor(
    @InjectModel(Pais.name) private readonly paisModel: Model<Pais>,
  ) {}

  async findById(id: string): Promise<Pais> {
    const pais = await this.paisModel.findById(id).exec();
    return pais;
  }

  async findOne(nomePais: string, nomeEnglish?: string, nomeFrench?: string): Promise<Pais> {
    return this.paisModel.findOne({ $or: [{nome: nomePais}, {nameEnglish: nomePais}, {nameEnglish: nomeEnglish}, {nameFrench: nomePais}, {nameFrench: nomeFrench}] }).exec();
  }

  async findByPartialName(nomePaisParcial: string): Promise<Pais[]> {
    const expressao = new RegExp(nomePaisParcial, 'i');
    const pais: Pais[] = await this.paisModel
      .find({ $or: [{nome: expressao}, {nameEnglish: expressao}, {nameFrench: expressao}]})
      .exec();
    return pais;
  }

  async insert(entradaPais: EntradaPais): Promise<Pais> {
    const managed = new this.paisModel(new Pais(entradaPais.nomePais, entradaPais.nameEnglish, entradaPais.nameFrench, entradaPais.flag));
    return await managed.save();
  }

  async getAll(): Promise<Pais[]> {
    return await this.paisModel.find().exec();
  }

}
