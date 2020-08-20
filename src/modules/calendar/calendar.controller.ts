import { Aula } from './../../domain/aula.domain';
import { Get, BadGatewayException, Controller } from '@nestjs/common';
import * as ical from 'ical';
const axios = require('axios');

@Controller('calendar')
export class CalendarController {
  constructor() {}

  @Get('/list')
  async gerarCalendario(): Promise<Aula[]> {
    const retorno: Aula[] = [];
    try {
      const response = await axios.get(
        'https://www.italki.com/calendar/70gDdDaIgAW93Pxd4ORQAN/ics',
      );

      const timezone = 'America/New_York';
      const padrao24Horas = false;

      const data = ical.parseICS(response.data);
      for (let k in data) {
        if (data.hasOwnProperty(k)) {
          var ev = data[k];
          if (data[k].type == 'VEVENT') {
            const arrayDescricao: string[] = ev.description.split('\n');
            const nomeAula = arrayDescricao[1].replace('Course /Service: ', '');
            const aulaDada = arrayDescricao[2].startsWith('Student:');
            const nomeAlunoOuProfessor = arrayDescricao[2].substring(9);

            const aula = new Aula();
            aula.titulo = ev.summary;
            aula.local = ev.location;
            aula.nome = nomeAula;

            if (aulaDada) {
              aula.aluno = nomeAlunoOuProfessor;
              aula.professor = 'Diego Serpa';
            } else {
              aula.aluno = 'Diego Serpa';
              aula.professor = nomeAlunoOuProfessor;
            }

            aula.contatos = arrayDescricao[3];
            aula.endereco = arrayDescricao[4].replace('URL: ', '');

            aula.dataInicioCompletaUTC = ev.start;
            aula.dataInicio = this.gerarDataPelaTimezone(
              ev.start,
              padrao24Horas,
              timezone,
            );
            aula.horaInicio = this.gerarHoraPelaTimezone(
              ev.start,
              padrao24Horas,
              timezone,
            );

            aula.dataFimCompletaUTC = ev.end;
            aula.dataFim = this.gerarDataPelaTimezone(
              ev.end,
              padrao24Horas,
              timezone,
            );
            aula.horaFim = this.gerarHoraPelaTimezone(
              ev.end,
              padrao24Horas,
              timezone,
            );

            retorno.push(aula);
          }
        }
      }
    } catch (error) {
      throw new BadGatewayException(
        'Erro na conversão do calendario do italki',
      );
    }

    return retorno;
  }

  //   gerarDataPelaTimezone(
  //     value: Date,
  //     padrao24: boolean,
  //     timeZone: string,
  //   ): string {
  //     const dia = this.fillCaracteres(value.getDate().toString(), '0', 2);
  //     const mes = this.fillCaracteres((value.getMonth() + 1).toString(), '0', 2);
  //     const ano = value.getFullYear().toString();

  //     console.log(value);

  //     let locale = 'en-US';

  //     if (padrao24) {
  //       locale = 'pt-BR';
  //     }

  //     const arrayHora = value
  //       .toLocaleString(locale, { timeZone })
  //       .replace(',', '')
  //       .split(' ');
  //     const composicaoHora = arrayHora[1].split(':');

  //     const hora = this.fillCaracteres(composicaoHora[0], '0', 2);
  //     const minuto = this.fillCaracteres(composicaoHora[1], '0', 2);
  //     const segundo = this.fillCaracteres(composicaoHora[2], '0', 2);

  //     const dataCompleta =
  //       ano +
  //       '-' +
  //       mes +
  //       '-' +
  //       dia +
  //       'T' +
  //       hora +
  //       ':' +
  //       minuto +
  //       ':' +
  //       segundo +
  //       '.000Z';
  //     const retorno = new Date(dataCompleta);

  //     return retorno;
  //   }

  gerarDataPelaTimezone(
    value: Date,
    padrao24: boolean,
    timeZone: string,
  ): string {
    const dia = this.fillCaracteres(value.getDate().toString(), '0', 2);
    const mes = this.fillCaracteres((value.getMonth() + 1).toString(), '0', 2);
    const ano = value.getFullYear().toString();

    const dataCompleta = ano + '-' + mes + '-' + dia;

    return dataCompleta;
  }

  gerarHoraPelaTimezone(
    value: Date,
    padrao24: boolean,
    timeZone: string,
  ): string {
    let locale = 'en-US';

    if (padrao24) {
      locale = 'pt-BR';
    }

    const arrayHora = value
      .toLocaleString(locale, { timeZone })
      .replace(',', '')
      .split(' ');
    const composicaoHora = arrayHora[1].split(':');

    const hora = this.fillCaracteres(composicaoHora[0], '0', 2);
    const minuto = this.fillCaracteres(composicaoHora[1], '0', 2);
    const segundo = this.fillCaracteres(composicaoHora[2], '0', 2);
    
    const horaCompleta = hora + ':' + minuto + (padrao24 ? '' : ' ' + arrayHora[2]);

    return horaCompleta;
  }

  fillCaracteres(value: string, filler: string, tamanhoMaximo: number): string {
    if (value.length < tamanhoMaximo) {
      let fillerTemp = '';
      for (let i = 0; i < tamanhoMaximo - value.length; i++) {
        fillerTemp += filler;
      }
      return fillerTemp + value;
    }

    return value;
  }
}
