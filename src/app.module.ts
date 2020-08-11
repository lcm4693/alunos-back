import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoController } from './aluno/aluno.controller';
import { AlunoService } from './aluno/aluno.service';
import { LinkController } from './link/link.controller';
import { LinkService } from './link/link.service';

@Module({
  imports: [],
  controllers: [AppController, AlunoController, LinkController],
  providers: [AppService, AlunoService, LinkService],
})
export class AppModule {}
