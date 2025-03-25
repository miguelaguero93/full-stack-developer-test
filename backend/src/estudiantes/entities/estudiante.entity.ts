import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Asignacion} from "../../asignaciones/entities/asignacion.entity";


@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @OneToMany(
    () => Asignacion,
    (asignacion: Asignacion) => asignacion.estudiante,
  )
  asignaciones: Asignacion[];
}
