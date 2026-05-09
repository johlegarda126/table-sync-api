# Table Sync API

API backend para la gestión de restaurantes y mesas.

## Funcionalidades

- Crear, consultar y actualizar restaurantes
- Crear y consultar mesas vinculadas a restaurantes existentes
- Reservar, ocupar y cancelar reservas de mesas
- Validación de horarios de restaurante y capacidad de mesas
- Transiciones de estado de mesa controladas

## Endpoints

### Restaurantes
- `POST /restaurants`
- `GET /restaurants`
- `GET /restaurants/:id`
- `PUT /restaurants/:id`

### Mesas
- `POST /tables`
- `GET /tables`
- `PUT /tables/:id/status`
- `POST /tables/:id/reserve`
- `POST /tables/:id/occupy`
- `DELETE /tables/:id/reserve`

## Reglas clave

- `Restaurant` tiene: `id`, `name`, `address`, `openingHours`, `closingHours`
- `Table` requiere un `restaurantId` válido y existente
- `openingHours` debe ser anterior a `closingHours`
- `capacity` debe ser entre `1` y `11`
- Estados válidos de mesa: `disponible`, `reservada`, `ocupada`
- Tipos válidos de mesa: `interior`, `exterior`, `privada`, `familiar`
- No se puede ocupar una mesa directamente desde `disponible`

## Ejemplo de creación de restaurante
```json
{
  "name": "Restaurante Las Flores",
  "address": "Av. Principal 123, Ciudad",
  "openingHours": "09:00",
  "closingHours": "22:00"
}
```

## Ejemplo de creación de mesa
```json
{
  "restaurantId": "<restaurant-id>",
  "number": 1,
  "capacity": 4,
  "tableType": "interior"
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
