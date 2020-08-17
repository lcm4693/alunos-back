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
    return await managed.save();
  }

  async findOne(username: string, password: string): Promise<User> {
    return this.userModel.findOne({ $and: [{username: username}, {password: password}] }).exec();
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

}
