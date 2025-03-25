import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sesion } from './entities/sesion.entity';
import { Repository } from 'typeorm';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

@Injectable()
export class SesionesService {
  constructor(
    @InjectRepository(Sesion)
    private repo: Repository<Sesion>,
    @InjectRepository(Asignacion)
    private asignacionRepo: Repository<Asignacion>,
  ) {}

  findAll(): Promise<Sesion[]> {
    return this.repo.find().then(async (sesiones) => {
      const withDisponibles = await Promise.all(
        sesiones.map(async (sesion) => {
          const count = await this.asignacionRepo.count({
            where: { sesion: { id: sesion.id } },
          });

          return {
            ...sesion,
            cuposRestantes: sesion.cupo - count,
          };
        }),
      );
      return withDisponibles;
    });
  }

  async findOne(id: number): Promise<Sesion> {
    const sesion = await this.repo.findOneBy({ id });
    if (!sesion) throw new NotFoundException('Sesión no encontrada');
    return sesion;
  }
}
