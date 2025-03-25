import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private repo: Repository<Estudiante>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const est = this.repo.create(createEstudianteDto);
    return this.repo.save(est);
  }

  async findAll(): Promise<Estudiante[]> {
    return this.repo.find();
  }

  async update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
  ): Promise<Estudiante> {
    const found = await this.repo.findOneBy({ id });
    if (!found) throw new NotFoundException('Estudiante no encontrado');
    Object.assign(found, updateEstudianteDto);
    return this.repo.save(found);
  }

  async remove(id: number): Promise<void> {
    const found = await this.repo.findOneBy({ id });
    if (!found) throw new NotFoundException('Asignación no encontrada');
    await this.repo.remove(found);
  }
}
