import { Module } from '@nestjs/common';
import { SesionesService } from './sesiones.service';
import { SesionesController } from './sesiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesion } from './entities/sesion.entity';
import {Asignacion} from "../asignaciones/entities/asignacion.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Sesion, Asignacion])],
  controllers: [SesionesController],
  providers: [SesionesService],
})
export class SesionesModule {}
