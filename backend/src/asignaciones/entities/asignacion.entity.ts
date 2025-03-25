import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import {Estudiante} from "../../estudiantes/entities/estudiante.entity";
import {Sesion} from "../../sesiones/entities/sesion.entity";

@Entity()
export class Asignacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Estudiante,
    (estudiante: Estudiante) => estudiante.asignaciones,
  )
  estudiante: Estudiante;

  @ManyToOne(() => Sesion,
      (sesion: Sesion) => sesion.asignaciones,
  )
  sesion: Sesion;
}
