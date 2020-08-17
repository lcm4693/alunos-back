import { PaisService } from 'src/modules/pais/pais.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Aluno, AlunoSchema } from '../../domain/aluno.domain';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { AlunoRepository } from './aluno.repository';
import { PaisRepository } from 'src/modules/pais/pais.repository';
import { PaisModule } from 'src/modules/pais/pais.module';
@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Aluno.name, schema: AlunoSchema },
    ]),
    PaisModule,
  ],
  controllers: [AlunoController],
  providers: [AlunoService, AlunoRepository],
  exports: [AlunoService]
})
export class AlunoModule {}
