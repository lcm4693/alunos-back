import { Roles } from './../../roles.decorator';
import { User } from './../../domain/user.domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RolesSystem } from 'src/constants/roles-system';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username, pass);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  login(user: User): User {
    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    
    const novoUser = User.converterUserSchematoUser(user);
    novoUser.access_token = access_token;
    
    return novoUser;
  }

  getAll(): string[] {
    const roles = RolesSystem.getValores();
    return roles;
  }
}
