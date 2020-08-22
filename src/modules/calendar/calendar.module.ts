import { CalendarRepository } from './calendar.repository';
import { Timezone, TimezoneSchema } from './../../domain/timezone.domain';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [
      MongooseModule.forFeature([
          { name: Timezone.name, schema: TimezoneSchema },
      ]),
    ],
    controllers: [CalendarController],
    providers: [CalendarService, CalendarRepository],
    exports: [CalendarService]
  })
export class CalendarModule {}
