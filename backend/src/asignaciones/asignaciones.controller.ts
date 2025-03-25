import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';
import { CreateAsignacioneDto } from './dto/create-asignacione.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Asignaciones')
@Controller('asignaciones')
export class AsignacionesController {
  constructor(private readonly asignacionesService: AsignacionesService) {}

  @Post()
  @ApiOperation({ summary: 'Asignar un estudiante a una sesión' })
  @ApiResponse({ status: 201, description: 'Asignación creada' })
  create(@Body() createAsignacioneDto: CreateAsignacioneDto) {
    return this.asignacionesService.create(createAsignacioneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las asignaciones' })
  findAll() {
    return this.asignacionesService.findAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una asignación por ID' })
  remove(@Param('id') id: string) {
    return this.asignacionesService.remove(+id);
  }
}
