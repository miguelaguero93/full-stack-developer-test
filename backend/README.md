# Gestor de Sesiones - Backend

Este servicio es una API REST construida con [NestJS](https://nestjs.com/) y [TypeORM](https://typeorm.io/), usando SQLite como base de datos embebida.

## Características

- Gestiona estudiantes, sesiones y asignaciones
- Carga automáticamente las sesiones desde `sesiones.json`
- Aplica reglas de negocio:
  - No permite inscripciones con cupo lleno
  - No permite solapamiento de horarios
- Documentación disponible en http://localhost:3000/api
## ️ Instalación local

Requiere [Node.js](https://nodejs.org/) v20+ y [npm](https://www.npmjs.com/).

Do

```bash
npm install
npm run start
