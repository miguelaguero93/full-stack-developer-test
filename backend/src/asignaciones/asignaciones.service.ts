import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAsignacioneDto } from './dto/create-asignacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Repository } from 'typeorm';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Sesion } from '../sesiones/entities/sesion.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion)
    private repo: Repository<Asignacion>,
    @InjectRepository(Estudiante)
    private estRepo: Repository<Estudiante>,
    @InjectRepository(Sesion)
    private sesRepo: Repository<Sesion>,
  ) {}

  async create(createAsignacioneDto: CreateAsignacioneDto) {
    const { estudianteId, sesionId } = createAsignacioneDto;

    const estudiante = await this.estRepo.findOneBy({ id: estudianteId });
    const sesion = await this.sesRepo.findOneBy({ id: sesionId });

    if (!estudiante || !sesion) {
      throw new BadRequestException('Estudiante o sesión no encontrados');
    }

    const asignacionExistente = await this.repo.findOne({
      where: { estudiante, sesion },
    });

    if (asignacionExistente) {
      throw new BadRequestException('Asignación ya existe');
    }

    // Validar solapamiento
    const asignaciones = await this.repo.find({
      where: { estudiante: { id: estudianteId } },
      relations: ['sesion', 'estudiante'],
    });

    const nuevaInicio = dayjs(sesion.start_datetime).toDate();
    const nuevaFin = dayjs(sesion.end_datetime).toDate();

    for (const asign of asignaciones) {
      const actualInicio = dayjs(asign.sesion.start_datetime).toDate();
      const actualFin = dayjs(asign.sesion.end_datetime).toDate();


      const seSolapan = nuevaInicio <= actualFin && nuevaFin >= actualInicio;
      if (seSolapan) {
        throw new BadRequestException(
          'Este estudiante ya está inscrito en otra sesión en ese horario',
        );
      }
    }

    // Validar cupo
    const cantidad = await this.repo.count({
      where: { sesion: { id: sesionId } },
    });
    if (cantidad >= sesion.cupo) {
      throw new BadRequestException('Cupo completo');
    }

    const asignacion = this.repo.create({ estudiante, sesion });
    return this.repo.save(asignacion);
  }

  findAll(): Promise<Asignacion[]> {
    return this.repo.find({ relations: ['estudiante', 'sesion'] });
  }

  async remove(id: number): Promise<void> {
    const found = await this.repo.findOneBy({ id });
    if (!found) throw new NotFoundException('Asignación no encontrada');
    await this.repo.remove(found);
  }
}
