import { Module } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';
import { AsignacionesController } from './asignaciones.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Estudiante} from "../estudiantes/entities/estudiante.entity";
import {Sesion} from "../sesiones/entities/sesion.entity";
import {Asignacion} from "./entities/asignacion.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Sesion, Asignacion])],
  controllers: [AsignacionesController],
  providers: [AsignacionesService],
})
export class AsignacionesModule {}
