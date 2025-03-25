// src/sesiones/sesion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Asignacion} from "../../asignaciones/entities/asignacion.entity";

@Entity()
export class Sesion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'datetime' })
  start_datetime: Date;

  @Column({ type: 'datetime' })
  end_datetime: Date;

  @Column()
  cupo: number;

  @OneToMany(() => Asignacion,
      (asignacion) => asignacion.sesion
  )
  asignaciones: Asignacion[];
}
