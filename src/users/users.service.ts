import { User } from './../domain/user.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: '1',
        username: 'john',
        password: 'changeme',
        firstName: '',
        lastName: '',
        access_token: ''
      },
      {
        id: '2',
        username: 'chris',
        password: 'secret',
        firstName: '',
        lastName: '',
        access_token: ''
      },
      {
        id: '3',
        username: 'maria',
        password: 'guess',
        firstName: '',
        lastName: '',
        access_token: ''
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}