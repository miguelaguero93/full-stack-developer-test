import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Estudiante } from './entities/estudiante.entity';

@ApiTags('Estudiantes')
@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo estudiante' })
  @ApiResponse({ status: 201, description: 'Estudiante creado correctamente' })
  create(
    @Body() createEstudianteDto: CreateEstudianteDto,
  ): Promise<Estudiante> {
    return this.estudiantesService.create(createEstudianteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los estudiantes' })
  findAll(): Promise<Estudiante[]> {
    return this.estudiantesService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar estudiante por ID' })
  update(
    @Param('id') id: number,
    @Body() data: Partial<Estudiante>,
  ): Promise<Estudiante> {
    return this.estudiantesService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar estudiante por ID' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.estudiantesService.remove(id);
  }
}
