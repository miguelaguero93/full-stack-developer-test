import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Sesion } from './entities/sesion.entity';
import { DEFAULT_ESTUDIANTES } from '../estudiantes/entities/default-estudiantes';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

@Injectable()
export class SeedSesionesService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Sesion)
    private sesionesRepo: Repository<Sesion>,
    @InjectRepository(Estudiante)
    private estudiantesRepo: Repository<Estudiante>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.sesionesRepo.count();
    if (count === 0) {
      const raw = fs.readFileSync('sesiones.json', 'utf-8');
      const data = JSON.parse(raw).sesiones;

      for (const nombre of Object.keys(data)) {
        const sesionesCurso = data[nombre];
        for (const s of sesionesCurso) {
          const sesion = this.sesionesRepo.create({
            nombre,
            start_datetime: dayjs(s.fecha_inicio, 'DD/MM/YYYY H:mm').format('YYYY-MM-DDTHH:mm:ss'),
            end_datetime: dayjs(s.fecha_fin, 'DD/MM/YYYY H:mm').format('YYYY-MM-DDTHH:mm:ss'),
            cupo: s.cupo,
          });
          await this.sesionesRepo.save(sesion);
        }
      }
    }

    const countEstudiantes = await this.estudiantesRepo.count();
    if (countEstudiantes === 0) {
      for (const est of DEFAULT_ESTUDIANTES) {
        await this.estudiantesRepo.save(this.estudiantesRepo.create(est));
      }
    }

    console.log('Sesiones cargadas correctamente desde JSON.');
  }
}
