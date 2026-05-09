# Especificación de la API de gestión de Mesas
## Descripción del problema
- Como Analista de Software, quiero **gestionar restaurantes y sus datos básicos** para que cada restaurante tenga identidad y horarios claros en el sistema.
- Como cliente de la API, quiero **consultar la información de restaurantes disponibles** para poder asociar reservas y mesas al restaurante correcto.
- Como administrador, quiero **mantener horarios de apertura y cierre actualizados** para asegurar que las mesas solo puedan gestionarse dentro del horario operativo.
- Verifique que el `/modules/tables` garantice que el `id` del restaurante exista en la coleccion de `restaurants` para poder crear una mesa.
## Descripción general de la solución
- Un endpoint REST sencillo que permita crear, leer, actualizar y listar restaurantes con su nombre, dirección y horario de apertura/cierre.
- La solución mantiene los datos de restaurante en memoria y asocia cada mesa a un `restaurantId` único generado por MongoDB.
- Se valida que los campos obligatorios estén presentes y que el horario sea coherente antes de almacenar o modificar un restaurante.
## Criterios de aceptación
- [ ] Cuando se crea un nuevo restaurante, la API genera un `id` único y almacena `nombre`, `dirección`, `openingHours` y `closingHours`.
- [ ] Cuando se consulta un restaurante por `id`, la API devuelve su `id`, `nombre`, `dirección`, `openingHours` y `closingHours`.
- [ ] Cuando se actualiza un restaurante, la API valida que el nombre y la dirección no estén vacíos.
- [ ] Cuando se actualiza un restaurante, la API valida que el horario de apertura sea anterior al horario de cierre.
- [ ] Cuando se lista restaurantes, la API devuelve solo restaurantes existentes sin incluir datos de mesas.
- [ ] Cuando se solicita información de restaurantes relacionados con mesas, el `restaurantId` debe existir antes de asociar mesas a ese restaurante.
- [ ] Cuando se intenta crear un restaurante con datos incompletos, la API devuelve un error de validación.
- [ ] Cuando se solicita un restaurante inexistente, la API devuelve un error claro indicando que no se encontró.
- [ ] Cuando se crea o actualiza un restaurante, la API mantiene la consistencia de los datos de horarios para evitar entradas inválidas.
- [ ] El endpoint `http://localhost:4000/tables/` solo permite crear mesas con `ìd` de restaurante existente.