# Frotend-Trabajo-Final
```markdown
# Trabajo-Final

Repositorio full‑stack (frontend + backend) escrito principalmente en TypeScript.

Descripción
-----------
Este proyecto contiene una API backend que expone endpoints y un frontend que consume esa API. El objetivo es ser un trabajo final funcional donde se demuestre arquitectura, separación de responsabilidades y buenas prácticas básicas.

Contenido de este README
- Explicación de la estructura del código (qué hace cada carpeta/principal archivo).
- Cómo ejecutar el proyecto localmente.
- Variables de entorno necesarias.
- Endpoints principales (ejemplos).
- Recomendaciones para pruebas, lint, CI y despliegue.

Estructura del proyecto
-----------------------
(Adapta los nombres si difieren en tu repo.)

- backend/
  - package.json
  - tsconfig.json
  - src/
    - index.ts / server.ts        ← punto de entrada (arranca el servidor)
    - app.ts                      ← configuración de Express/Server (middlewares, rutas)
    - routes/
      - *.route.ts                ← definición de rutas/URLs
    - controllers/
      - *.controller.ts           ← lógica que maneja la petición/respuesta
    - services/
      - *.service.ts              ← lógica de negocio, acceso a datos
    - models/ / repositories/     ← definiciones de entidades y acceso a DB (ORM/queries)
    - middlewares/
      - auth.middleware.ts
      - error.middleware.ts
    - utils/
      - logger.ts, helpers.ts
    - config/
      - index.ts                  ← carga variables de entorno, configuración
- frontend/
  - package.json
  - tsconfig.json
  - public/                       ← assets estáticos
  - src/
    - main.tsx / main.ts          ← punto de entrada (React/Vite/Next)
    - App.tsx / App.vue           ← componente raíz
    - pages/ or views/            ← pantallas (e.g., Home, Login, Dashboard)
    - components/                 ← componentes reutilizables (Botón, Modal, Form)
    - services/
      - api.ts                    ← funciones que llaman a la API (fetch/axios)
    - hooks/                      ← hooks personalizados
    - styles/                     ← css/scss/global
- README.md
- .gitignore
- .env.example (recomendado)
- docker-compose.yml / Dockerfile (opcional)

Explicación del código — Backend
--------------------------------
Puntos claves que debes tener claros en tu backend:

- Entrada (index.ts / server.ts)
  - Crea el servidor (por ejemplo con Express o Fastify).
  - Conecta a la base de datos.
  - Registra middlewares globales (CORS, JSON body parser, logging).
  - Monta rutas: app.use('/api/users', usersRouter), etc.

- app.ts (separación de configuración)
  - Registrar middlewares reutilizables.
  - Registrar manejadores de errores (middleware final).

- Routes → Controllers → Services
  - Routes: sólo definen endpoints y validaciones de parámetros.
  - Controllers: reciben req/res y llaman a Services.
  - Services: contienen la lógica de negocio (consultas a BD, validaciones complejas).
  - Repositorios/Models: interactúan con la base de datos (ORM o queries).

- Middlewares importantes
  - Autenticación (JWT/session).
  - Validación de entrada (Zod/Joi).
  - Manejo de errores centralizado: devolver JSON con { error, message, code }.
  - Rate limiting y seguridad (helmet, cors bien configurado).

Explicación del código — Frontend
---------------------------------
Puntos claves en el frontend:

- Punto de entrada (main.tsx)
  - Renderiza <App /> y monta el router (React Router / Vite / Next).
  - Provee Providers (Context, ThemeProvider, QueryClientProvider si usas React Query).

- App / Router
  - Define las rutas privadas y públicas.
  - Carga layout común (header/footer/sidebars).

- Components vs Pages
  - Pages: representan vistas completas para una ruta.
  - Components: piezas reutilizables (formularios, inputs, botones).

- Servicios/API
  - api.ts: centraliza llamadas HTTP (axios instancia con baseURL y manejo de tokens).
  - Manejo de tokens: guarda en localStorage o cookies (con consideraciones de seguridad).

- Estado
  - Local: useState/useReducer para estado local.
  - Global: Context / Zustand / Redux para estado compartido (usuario, carrito, etc).
  - Data fetching: React Query es muy útil para caché y revalidación.

Variables de entorno (ejemplos)
-------------------------------
Crea un `.env.example` con las variables mínimas:

Backend (.env)
PORT=3001
DATABASE_URL=postgres://user:pass@localhost:5432/dbname
JWT_SECRET=tu_jwt_secreto
NODE_ENV=development

Frontend (.env)
VITE_API_URL=http://localhost:3001/api
VITE_PUBLIC_KEY=...

Cómo ejecutar (local)
---------------------
1) Clona el repo
```bash
git clone https://github.com/Jvier-Zaia/Trabajo-Final.git
cd Trabajo-Final
```

2) Backend
```bash
cd backend
cp .env.example .env   # configura según tus datos
npm install
npm run dev            # o npm start
```

3) Frontend
```bash
cd ../frontend
cp .env.example .env   # configura VITE_API_URL
npm install
npm run dev            # abre http://localhost:5173 (o lo que indique)
```

