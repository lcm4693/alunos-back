import { User } from '../../domain/user.domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async insert(user: User): Promise<User> {
    const managed = new this.userModel(user);
    return this.converterUserSchemaToUser(await managed.save());
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    
    return user;
    // return this.converterUserSchemaToUser(user);
  }

  async findOne(username: string, password: string): Promise<User> {
    return this.converterUserSchemaToUser(
      await this.userModel
        .findOne({ $and: [{ username: username }, { password: password }] })
        .exec(),
    );
  }

  async getAll(): Promise<User[]> {
    return await this.converterUserSchemaToUsers(
      await this.userModel.find().exec(),
    );
  }

  private converterUserSchemaToUser(value: User): User {
    return User.converterUserSchematoUser(value);
  }

  private async converterUserSchemaToUsers(value: User[]): Promise<User[]> {
    let retorno = [];
    for (const user of value) {
      retorno.push(User.converterUserSchematoUser(user));
    }
    return retorno;
  }
}
