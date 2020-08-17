import { UsersRepository } from './users.repository';
import { EntradaUser } from '../../dto/entrada-user.dto';
import { User } from './../../domain/user.domain';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

  constructor(private readonly service: UsersRepository) {
  }

  async inserir(entradaUser: EntradaUser): Promise<User> {
    const user = User.converterEntradaUsertoUser(entradaUser);
    const userInserido = await this.service.insert(user);
    return userInserido;
  }

  async findOne(username: string, password: string): Promise<User | undefined> {
    const usuario = this.service.findOne(username, password);
    return usuario;
  }

  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }
}