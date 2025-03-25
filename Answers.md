# Answers - Full Stack Developer Test

---

### ¿Cuánto tiempo dedicaste a la prueba de codificación de backend?

Aproximadamente 4 horas. Incluyendo diseño del modelo de datos, lógica de negocio (validaciones de solapamiento y cupo), CRUD completo y documentación Swagger.

---

### ¿Qué agregarías a tu solución si tuvieras más tiempo?

- Sistema de autenticación (JWT)
- Roles (admin/estudiante)
- Filtrado por alumno y por fecha en sesiones
- Paginación en endpoints
- Testing unitario y e2e
- WebSocket para notificaciones de cambios en sesiones en tiempo real

---

### ¿Cuáles fueron los motivos de tu elección de arquitectura para este tipo de aplicación?

He utilizado NestJS porque ofrece una estructura modular, mantenible y escalable para backend REST APIs, junto con TypeORM para un manejo simple de base de datos y relaciones. 
En frontend, he elegido React + Tailwind por su velocidad de desarrollo y capacidad responsive.

---

### ¿Cómo se pueden gestionar los casos posteriores a la medianoche para que se muestren el mismo día y no el siguiente?

El truco es interpretar correctamente la fecha como franja horaria específica (ej: UTC-3) y agrupar por `YYYY-MM-DD` en la zona deseada. En el frontend he usado `dayjs` con formato `'YYYY-MM-DD'` para mantener la fecha base, sin importar la hora.

---

###  ¿Cuánto tiempo dedicaste al frontend? ¿Cuáles fueron tus mayores dificultades?

Alrededor de 3 horas. La dificultad principal fue coordinar correctamente los formatos de fecha entre backend (ISO o string) y frontend (formateado para visualización), y hacer que el diseño fuera limpio, profesional y con modo oscuro.

---

### ¿Cómo localizarías un problema de rendimiento en producción? ¿Has tenido que hacer esto antes?

Sí, lo he hecho antes. Usaría herramientas como:
- Logs con timestamps (Winston, Morgan)
- Profiling de queries
- Lighthouse para frontend
---

### ¿Cuál fue la característica más útil de la última versión del lenguaje elegido?

En TypeScript, las mejoras en inferencia de tipos y la nueva satisfies keyword:


```typescript
const estudiante = {
  nombre: 'Juan',
  correo: 'juan@example.com',
} satisfies Estudiante;