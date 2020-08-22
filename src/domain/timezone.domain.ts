import * as mongoose from 'mongoose';

export class Timezone {
  public timezone: string;

  public static converterTimezoneSchemaToTimezones(
    timezones: Timezone[],
  ): Timezone[] {
    const retorno = [];
    for (const value of timezones) {
      const newTimezone = new Timezone();
      newTimezone.timezone = value.timezone;

      retorno.push(newTimezone);
    }

    return retorno;
  }
}

export const TimezoneSchema = new mongoose.Schema({
  timezone: String,
});
