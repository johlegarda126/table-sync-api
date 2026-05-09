# Instrucciones para Agentes

## Descripción del Producto
TableSync API es un backend REST para gestionar mesas y reservas en restaurantes.
Valida disponibilidad, capacidad y estados de mesas mediante una API simple.
Soporta múltiples restaurantes con aislamiento de datos por restaurantId.

## Implementación Técnica

### Stack Tecnológico
- Lenguaje: **TypeScript 5.5.4**
- Framework: **Express.js 4.19.2**
- Testing: **Playwright 1.59.1**
- Build: **tsc (TypeScript Compiler)**
- Runtime: **Node.js**
- Seguridad: **Validación de entrada en cada endpoint**
- Logging: **Console (stdout)**

### Flujo de Desarrollo
```bash
# Instalar dependencias
npm install

# Compilar TypeScript a JavaScript
npm run build

# Ejecutar en modo desarrollo (con auto-reload)
npm run dev

# Ejecutar en producción
npm start

# Ejecutar pruebas e2e
npm test
```

## Arquitectura Modular
Monolito modular con separación clara de responsabilidades.
Cada módulo (tables) contiene: routes, controllers, services, types, model.
Diseño escalable para migración futura a microservicios.

## Estructura de Carpetas
```text
.
├── AGENTS.md                    # Instrucciones para agentes IA
├── CHANGELOG.md                 # Historial de versiones
├── README.md                    # Documentación principal
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración TypeScript
├── playwright.config.ts         # Configuración de pruebas
├── src/
│   ├── index.ts                 # Punto de entrada y configuración Express
│   ├── modules/
│   │   └── tables/
│   │       ├── types/
│   │       │   └── index.ts      # Interfaces y tipos (Table, Status)
│   │       ├── model/
│   │       │   └── Table.ts      # Definición del modelo
│   │       ├── services/
│   │       │   └── TableService.ts # Lógica de negocio
│   │       ├── controllers/
│   │       │   └── TableController.ts # Manejo de requests/responses
│   │       └── routes/
│   │           └── tables.routes.ts # Definición de endpoints
│   └── shared/
│       └── utils/                # Utilidades compartidas
├── tests/
│   ├── status.spec.ts            # Test del endpoint /status
│   └── tables.spec.ts            # Tests de criterios de aceptación
├── specs/
│   └── tables.spec.md            # Especificación de requisitos
└── dist/                         # Código compilado (generado)
```

## Endpoints Principales
- `POST /tables` - Crear mesa
- `GET /tables` - Listar mesas (con filtros)
- `PUT /tables/:id/status` - Cambiar estado
- `POST /tables/:id/reserve` - Reservar mesa
- `POST /tables/:id/occupy` - Ocupar mesa
- `DELETE /tables/:id/reserve` - Cancelar reserva
- `GET /status` - Health check

## Modelo de Datos
Tabla: id, restaurantId, number, capacity, status, tableType, reservationId?.
Estados: disponible, reservada, ocupada.
Tipos: interior, exterior, privada, familiar.

## Reglas de Validación
- Capacidad: 1-11 personas.
- Campos requeridos: restaurantId, number, capacity, tableType.
- Transiciones permitidas: disponible→reservada→ocupada→disponible.
- No se puede ir directo de disponible a ocupada.
- Cada (restaurantId, number) es única.

## Entorno
- Código y documentación en inglés.
- Respuestas del chat en idioma del usuario.
- Sacrificar gramática por concisión.
- Entorno Windows con terminal git bash.
- Rama por defecto: main.
- Puerto por defecto: 3000.
- Base de datos: En memoria (array).
