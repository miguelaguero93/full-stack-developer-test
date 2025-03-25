import { Controller, Get, Param } from '@nestjs/common';
import { SesionesService } from './sesiones.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Sesion } from './entities/sesion.entity';

@ApiTags('Sesiones')
@Controller('sesiones')
export class SesionesController {
  constructor(private readonly sesionesService: SesionesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las sesiones' })
  findAll(): Promise<Sesion[]> {
    return this.sesionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener sesión por ID' })
  async findOne(@Param('id') id: number): Promise<Sesion> {
    return this.sesionesService.findOne(id);
  }
}
