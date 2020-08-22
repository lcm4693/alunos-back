import { CalendarService } from './../calendar/calendar.service';
import { RolesSystem } from '../../constants/roles-system';
import { UsersRepository } from './users.repository';
import { EntradaUser } from '../../dto/entrada-user.dto';
import { User } from './../../domain/user.domain';
import { Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly calendarService: CalendarService,
    private readonly service: UsersRepository,
  ) {}

  async inserir(entradaUser: EntradaUser): Promise<User> {
    const userRegistrado = await this.findByUsername(entradaUser.username);
    if (userRegistrado) {
      throw new ForbiddenException(
        'O username ' + entradaUser.username + ' já encontra-se cadastrado',
      );
    }

    const user = User.converterEntradaUsertoUser(entradaUser);
    const timezone = await this.calendarService.findByTimezone(
      entradaUser.timezone,
    );

    user.locale = timezone;

    if (!user.roles) {
      user.roles = [RolesSystem.ALUNO];
    }

    const userInserido = User.converterUserSchematoUser(
      await this.service.insert(user),
    );
    return userInserido;
  }

  async atualizar(
    entradaUser: EntradaUser,
    usuarioLogado: User,
  ): Promise<User> {
    if (
      !usuarioLogado.roles.includes(RolesSystem.ADMIN) &&
      entradaUser.username !== usuarioLogado.username
    ) {
      throw new ForbiddenException('Você não pode alterar esse usuário');
    }

    const usuarioASerAlterado = await this.service.findByUsername(
      entradaUser.username,
    );
    usuarioASerAlterado.firstName = entradaUser.firstName;
    usuarioASerAlterado.lastName = entradaUser.lastName;

    // const timezone = await this.calendarService.findByTimezone(
    //   entradaUser.timezone,
    // );

    // usuarioASerAlterado.locale = timezone;
    usuarioASerAlterado.padrao24 = entradaUser.padrao24;
    if (usuarioLogado.roles.includes(RolesSystem.ADMIN)) {
      usuarioASerAlterado.roles = entradaUser.roles;
    }
    
    if (entradaUser.password) {
      if (entradaUser.username === usuarioLogado.username) {
        usuarioASerAlterado.password = entradaUser.password;
      } else {
        throw new ForbiddenException(
          'Você não está autorizado a trocar a senha de outro usuário',
        );
      }
    }

    await this.service.update(usuarioASerAlterado);

    return User.converterUserSchematoUser(usuarioASerAlterado);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const usuario: User = await this.service.findByUsername(username);
    return usuario;
  }

  async findOne(username: string, password: string): Promise<User | undefined> {
    const usuario = User.converterUserSchematoUser(
      await this.service.findOne(username, password),
    );
    return usuario;
  }

  async getAll(): Promise<User[]> {
    const retorno = await this.service.getAll();
    return retorno;
  }
}
