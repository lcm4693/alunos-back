import { User } from '../../domain/user.domain';
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

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
    
    const novoUser = new User();
    novoUser.id = user.id;
    novoUser.firstName = user.firstName;
    novoUser.lastName = user.lastName;
    novoUser.username = user.username
    novoUser.access_token = access_token;

    return novoUser;
  }
}
