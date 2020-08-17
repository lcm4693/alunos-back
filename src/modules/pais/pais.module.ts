import { PaisService } from './pais.service';
import { PaisRepository } from './pais.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Pais, PaisSchema } from './../../domain/pais.domain';
import { PaisController } from './pais.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pais.name, schema: PaisSchema }]),
  ],
  controllers: [PaisController],
  providers: [PaisService, PaisRepository],
  exports: [PaisService],
})
export class PaisModule {}
