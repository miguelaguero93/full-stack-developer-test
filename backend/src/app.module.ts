import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedSesionesService } from './sesiones/seed-sesiones.service';
import { AsignacionesModule } from './asignaciones/asignaciones.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { SesionesModule } from './sesiones/sesiones.module';
import { Estudiante } from './estudiantes/entities/estudiante.entity';
import { Sesion } from './sesiones/entities/sesion.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Estudiante, Sesion, Asignacion],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Estudiante, Sesion, Asignacion]),
    AsignacionesModule,
    EstudiantesModule,
    SesionesModule,
  ],
  providers: [SeedSesionesService],
})
export class AppModule {}
