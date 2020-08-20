import { CalendarController } from './calendar.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [
    //   MongooseModule.forFeature([
    //       { name: Aluno.name, schema: AlunoSchema },
    //   ]),
    //   PaisModule,
    //   UsersModule,
    ],
    controllers: [CalendarController],
    providers: [],
    exports: []
  })
export class CalendarModule {}
