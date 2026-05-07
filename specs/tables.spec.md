# Especificación de la API de gestión de Mesas
## Descripción del problema
- Como Analista de Software, quiero **gestionar la reservación de mesas en un restaurante** para garantizar que las mesas se asignen correctamente según su capacidad, tipo y estado.
- Como usuario de la API, quiero **consultar la disponibilidad y el estado de las mesas** para evitar reservas dobles y conocer qué mesas se pueden reservar.
- Como operador del restaurante, quiero **cambiar el estado de una mesa entre disponible, reservada y ocupada** para reflejar la situación real de las mesas.
## Descripción general de la solución
- Un endpoint REST sencillo que permita crear, consultar y actualizar mesas de restaurante usando un modelo de datos básico. Cada mesa incluye su restaurante asociado, número, capacidad, estado y tipo.
- La solución valida la capacidad y los valores permitidos de estado y tipo, y mantiene reglas simples de transición de estado.
- Se expone la información necesaria para listar mesas por restaurante, filtrar por disponibilidad y modificar el estado de reservación.
## Criterios de aceptación
- [ ] Cuando se solicita la información de una mesa, la API devuelve `id`, `restaurantId`, `number`, `capacity`, `status` y `tableType`.
- [ ] Cuando se crea o actualiza una mesa, la API rechaza valores de `capacity` que estén fuera del rango 1 a 11.
- [ ] Cuando se crea o actualiza una mesa, la API rechaza `status` que no sea uno de: `disponible`, `reservada`, `ocupada`.
- [ ] Cuando se crea o actualiza una mesa, la API rechaza `tableType` que no sea uno de: `interior`, `exterior`, `privada`, `familiar`.
- [ ] Cuando se reserva una mesa, su estado cambia de `disponible` a `reservada`.
- [ ] Cuando una mesa reservada pasa a estar en uso, su estado cambia de `reservada` a `ocupada`.
- [ ] Cuando se consulta la disponibilidad de mesas, la API devuelve solo mesas con estado `disponible`.
- [ ] Cuando se listan las mesas de un restaurante, la respuesta incluye únicamente mesas asociadas al `restaurantId` solicitado.
- [ ] Cuando se guarda una mesa nueva, la API valida que todos los campos obligatorios estén presentes y que el registro sea consistente.