# Ticketera Backend

Backend de ticketera con Node.js, Express, Sequelize y PostgreSQL. Autenticación JWT, validación con Joi, Swagger en `/docs`, paginación/filtros y RBAC simple.

## Requisitos
- Node.js 18+
- PostgreSQL 13+
- Variable de entorno `DATABASE_URL` obligatoria.

## Configuración
Crear `.env` basado en `.env.example`:

```
DATABASE_URL=postgres://USER:PASS@HOST:PORT/DBNAME
JWT_SECRET=your-secret
PORT=3000
```

## Scripts
- `npm run dev` arranca en desarrollo con nodemon.
- `npm start` inicia servidor.
- `npm run db:migrate` ejecuta migraciones.
- `npm run db:seed` aplica seeders.
- `npm run db:undo` deshace migraciones y seeders.
- `npm test` ejecuta tests (requiere DB configurada y migrada/seeded).
- `npm run lint` linter.

## Base de datos
Todo via `DATABASE_URL`. Configuración en `config/config.js` usa `use_env_variable: 'DATABASE_URL'` para `development`, `test` y `production`. En production se habilita `ssl` (require).

Migraciones y seeders:
```
npx sequelize db:migrate
npx sequelize db:seed:all
```

## Ejecutar
```
npm run dev
# o
npm start
```

### Docker (opcional)
```
docker-compose up --build
```
La API usa `DATABASE_URL` dentro del contenedor.

## Despliegue en Vercel
- Este repo ya incluye `api/index.js` y `vercel.json` para funcionar como Serverless Function en Vercel.
- Configura en el proyecto de Vercel las variables de entorno:
  - `DATABASE_URL` (obligatoria)
  - `JWT_SECRET`
  - `PORT` (opcional; Vercel ignora el puerto y enrutará al handler)
- Migraciones/Seeders: ejecuta desde tu máquina o CI apuntando al mismo `DATABASE_URL` de producción:
  - `npx sequelize db:migrate`
  - `npx sequelize db:seed:all`
  Nota: no es recomendable correr migraciones automáticamente en cada build de Vercel.
- Endpoints quedarán disponibles bajo tu dominio Vercel; Swagger UI en `/docs`.

## Endpoints principales
- `GET /health` -> `{ ok: true }`
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Users (admin/manager): CRUD básico, desactivar.
- Teams (manager/admin): CRUD + asociar/desasociar usuarios.
- Projects (manager/admin): CRUD + filtros por `teamId`, `status`.
- Tickets (member+ crea, manager/admin gestiona): CRUD + filtros + `GET /api/tickets/:id/summary`.
- Time Entries (member+): crear y listar con filtros por `ticketId` y fechas.

Swagger UI: `GET /docs`

## Tests
Requiere base de datos lista (migrada y seed con admin `admin@example.com` / `Password123!`).
```
export DATABASE_URL=postgres://...
npx sequelize db:migrate
npx sequelize db:seed:all
npm test
```

## Ejemplos curl
Login:
```
curl -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"Password123!"}'
```
Listar tickets:
```
curl -H "Authorization: Bearer <TOKEN>" \
  'http://localhost:3000/api/tickets?page=1&limit=20&sortBy=createdAt&order=desc&status=open'
```
