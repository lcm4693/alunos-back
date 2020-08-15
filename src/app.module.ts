import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoController } from './aluno/aluno.controller';
import { AlunoService } from './aluno/aluno.service';
import { LinkController } from './link/link.controller';
import { LinkService } from './link/link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunoSchema, Aluno } from './domain/aluno.domain';
import { PaisSchema, Pais } from './domain/pais.domain';
import { PaisService } from './pais/pais.service';
import { PaisController } from './pais/pais.controller';
import { PaisRepository } from './pais/pais.repository';
import { AlunoRepository } from './aluno/aluno.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.0.2/aluno-controle'),
    MongooseModule.forFeature([
      { name: Aluno.name, schema: AlunoSchema },
      { name: Pais.name, schema: PaisSchema },
    ]),
  ],
  controllers: [AppController, AlunoController, LinkController, PaisController],
  providers: [AppService, AlunoService, LinkService, PaisService, AlunoRepository, PaisRepository],
})
export class AppModule {}
