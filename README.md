API de backend para la gestión de reservas en restaurantes.

## Características principales

### Gestión de Mesas
- Crear, consultar y actualizar mesas de restaurante
- Validación automática de capacidad (1-11 personas) y tipos de mesa
- Gestión de estados: disponible → reservada → ocupada

### Validaciones
+ Las mesas tienen capacidades limitadas entre 1 y 11 personas
+ Estados válidos: `disponible`, `reservada`, `ocupada`
+ Tipos de mesa válidos: `interior`, `exterior`, `privada`, `familiar`
+ Transiciones de estado controladas para evitar operaciones inválidas
+ Todos los campos requeridos deben estar presentes al crear una mesa

### Consultas y Filtros
+ Listar mesas por restaurante específico
+ Filtrar por disponibilidad para consultar mesas libres
+ Filtrar por tipo de mesa para obtener configuraciones específicas

### Ciclo de vida de reservas
+ Permite el registro de restaurantes con datos necesarios para la identidad; a este `id` único se deben vincular mesas creadas
+ Las reservas se programan para restaurantes específicos, considerando fecha, hora y número de personas
+ Los restaurantes cuentan con mesas de diferentes capacidades; las solicitudes de reserva se validan según la disponibilidad y capacidad de las mesas
+ Las mesas tienen plazas limitadas; una reserva no puede exceder la capacidad disponible en el horario solicitado
+ Ciclo de vida del estado de la reserva: pendiente → confirmada → completada, o cancelación
+ Cada cliente se identifica por su correo electrónico, nombre y número de teléfono
+ Un cliente puede realizar múltiples reservas, pero no puede tener reservas activas en el mismo horario
+ Las reservas bloquean una mesa durante un tiempo determinado para evitar solapamientos
+ Se genera un pago al momento de realizar la reserva y este se procesa a través de una pasarela de pago simulada

## Endpoints de la API

### Crear una mesa
```
POST /tables
Content-Type: application/json

{
  "restaurantId": "rest-001",
  "number": 1,
  "capacity": 4,
  "tableType": "interior"
}

Response: 201 Created
{
  "id": "rest-001-1",
  "restaurantId": "rest-001",
  "number": 1,
  "capacity": 4,
  "status": "disponible",
  "tableType": "interior"
}
```

### Obtener mesas (con filtros opcionales)
```
GET /tables?restaurantId=rest-001&status=disponible&tableType=interior

Response: 200 OK
[
  {
    "id": "rest-001-1",
    "restaurantId": "rest-001",
    "number": 1,
    "capacity": 4,
    "status": "disponible",
    "tableType": "interior"
  }
]
```

### Actualizar estado de una mesa
```
PUT /tables/:id/status
Content-Type: application/json

{
  "status": "reservada"
}

Response: 200 OK
{
  "id": "rest-001-1",
  ...
  "status": "reservada"
}
```

### Reservar una mesa
```
POST /tables/:id/reserve

Response: 200 OK
{
  "message": "Reserved",
  "reservationId": "res-1234567890"
}
```

### Ocupar una mesa
```
POST /tables/:id/occupy

Response: 200 OK
{
  "message": "Table occupied"
}
```

### Cancelar una reserva
```
DELETE /tables/:id/reserve

Response: 200 OK
{
  "message": "Reservation canceled"
}
```

## Desarrollo

### Instalación
```bash
npm install
```

### Ejecutar en desarrollo
```bash
npm run dev
```

### Compilar
```bash
npm run build
```

### Ejecutar pruebas
```bash
npm test
```

### Ejecutar en producción
```bash
npm start
```

## Criterios de Aceptación (Validados)
✅ API devuelve id, restaurantId, number, capacity, status y tableType para cada mesa
✅ Validación de capacidad entre 1 y 11
✅ Validación de estados permitidos: disponible, reservada, ocupada
✅ Validación de tipos de mesa: interior, exterior, privada, familiar
✅ Transición de estado: disponible → reservada al reservar
✅ Transición de estado: reservada → ocupada al ocupar
✅ Consultas de disponibilidad retornan solo mesas con status disponible
✅ Listado de mesas filtrado por restaurantId
✅ Validación de campos requeridos al crear mesas
✅ Prevención de transiciones de estado inválidas
✅ Cancelación de reservas y retorno a estado disponible
