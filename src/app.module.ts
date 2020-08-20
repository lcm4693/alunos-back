import { LoggerMiddleware } from './middleware/logger.middleware';
import { AlunoModule } from './modules/aluno/aluno.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { LinkController } from './link/link.controller';
import { LinkService } from './link/link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PaisModule } from './modules/pais/pais.module';
import { CalendarModule } from './modules/calendar/calendar.module';

// const enderecoMongo = '18.231.171.153:27020';
const enderecoMongo = '192.168.0.2';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://' + enderecoMongo + '/aluno-controle'),
    AuthModule,
    AlunoModule,
    UsersModule,
    PaisModule,
    CalendarModule,
  ],
  controllers: [AppController, LinkController],
  providers: [LinkService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude('/login/authenticate')
      .forRoutes('*');
  }
}
