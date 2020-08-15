import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Pais } from '../domain/pais.domain';
import { EntradaPais } from 'src/dto/entrada-pais.dto';
import { PaisRepository } from './pais.repository';

@Injectable()
export class PaisService {
  constructor(private readonly paisRepository: PaisRepository) {}

  async buscarPaisPorId(id: string): Promise<Pais> {
    const pais = await this.paisRepository.findById(id);

    if (!pais) {
      throw new NotFoundException('País não encontrado');
    }

    return pais;
  }

  async buscarPaisPorNome(nomePais: string): Promise<Pais> {
    const pais = this.paisRepository.findOne(nomePais);
    return pais;
  }

  async buscarPaisesPorNomeParcial(nomePaisParcial: string): Promise<Pais[]> {
    if (nomePaisParcial && nomePaisParcial.length < 3) {
      throw new ForbiddenException(
        'O nome do país precisa ter, no mínimo, 3 letras',
      );
    }

    const pais: Pais[] = await this.paisRepository.findByPartialName(
      nomePaisParcial,
    );
    return pais;
  }

  async inserir(entradaPais: EntradaPais): Promise<Pais> {
    const paisJaCadastrado = await this.paisRepository.findOne(
      entradaPais.nomePais,
      entradaPais.nameEnglish,
      entradaPais.nameFrench,
    );

    if (paisJaCadastrado) {
      throw new ForbiddenException('Objeto já existe na base');
    }

    const paisInserido = await this.paisRepository.insert(entradaPais);
    return paisInserido;
  }

  async getAll(): Promise<Pais[]> {
    return await this.paisRepository.getAll();
  }
}
