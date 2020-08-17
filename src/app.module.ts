import { AlunoModule } from './modules/aluno/aluno.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LinkController } from './link/link.controller';
import { LinkService } from './link/link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PaisModule } from './modules/pais/pais.module';

const enderecoMongo = '18.231.171.153';
// const enderecoMongo = "192.168.0.2";
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://' + enderecoMongo + ':27020/aluno-controle'),
    AuthModule,
    AlunoModule,
    UsersModule,
    PaisModule
  ],
  controllers: [AppController, LinkController, ],
  providers: [
    LinkService,
  ],
})
export class AppModule {}
