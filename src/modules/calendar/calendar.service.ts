import { Timezone } from './../../domain/timezone.domain';
import { CalendarRepository } from './calendar.repository';
import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';

@Injectable()
export class CalendarService {
  constructor(private readonly repository: CalendarRepository) {}

  async insertTimezone(timezones: string[]) {
    const arrayJaNaBase = [];
    const arrayIncluidos = []
    const arrayErros = [];

    for (const value of timezones) {
      try {
        const objetoJaExiste: Timezone = await this.findByTimezone(value);

        if (objetoJaExiste) {
            arrayJaNaBase.push(value);
            continue;
        }

        const objeto = new Timezone();
        objeto.timezone = value;
        await this.repository.insertTimezone(objeto);
        arrayIncluidos.push(value);
      } catch (e) {
        console.log('Houve um erro ao tentar incluir a timezone: ', value);
        arrayErros.push(value);
      }
    }
    console.log('Já na base:', arrayJaNaBase);
    console.log('Incluídos:', arrayIncluidos);
    console.log('Erros:', arrayErros);
  }

  async findByTimezone(timezone: string): Promise<Timezone> {
    const timezoneGerenciada = await this.repository.findByTimezone(timezone);
    if (!timezone) {
      throw new NotFoundException('A timezone informada não foi encontrada');
    }
    return timezoneGerenciada;
  }

  async findById(id: string): Promise<Timezone> {
    const timezoneGerenciada = await this.repository.findById(id);
    if (!timezoneGerenciada) {
      throw new NotFoundException('A timezone informada não foi encontrada');
    }
    return timezoneGerenciada;
  }

  async getAll(): Promise<Timezone[]> {
    return Timezone.converterTimezoneSchemaToTimezones(
      await this.repository.getAll(),
    );
  }
}
