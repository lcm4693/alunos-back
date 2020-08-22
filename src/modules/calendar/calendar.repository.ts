import { Timezone } from './../../domain/timezone.domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectModel(Timezone.name) private readonly model: Model<Timezone>,
  ) {}

  async insertTimezone(timezone: Timezone): Promise<Timezone> {
    const managed = new this.model(timezone);
    return await managed.save();
  }

  async findByTimezone(timezone: string): Promise<Timezone> {
    return await this.model.findOne({ timezone }).exec();
  }

  async findById(id: string): Promise<Timezone> {
    return await this.model.findById(id).exec();
  }

  async getAll(): Promise<Timezone[]> {
    return await this.model.find().exec();
  }
}
