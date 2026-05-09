# Requerimiento

## Rol
Asume el rol de un **Analista de Software**

## Tareas
Genere una especificación para implementar la funcionalidad descrita a continuación. No escriba ningún código ni pruebas, solo la especificación.

## Contexto
+ Un endpoint para gestionar restaurantes y sus mesas. 
+ Cada restaurante tiene:
  - id (único generado por MondoDB)
  - nombre
  - dirección
  - horario de apertura y cierre
+ Existe una `modules/tables` que gestiona las mesas de cada restaurante, con su propia especificación en `specs/tables.spec.md`.

Solicitar cualquier contexto adicional si es necesario.

## Plantilla de especificación
Siga esta plantilla para escribir el archivo de especificaciones en el archivo: `specs/restaurants.spec.md`

```
# Especificación de la API de gestión de Mesas
## Descripción del problema
- Como {rol} , quiero **{funcionalidad}** para {beneficio}.
## Descripción general de la solución
- Enfoque sencillo para resolver el problema, sin detalles técnicos.
## Criterios de aceptación
- [ ] formato EARS
```
## Pasos a seguir
**1. Definir el problema**
  + Describa claramente el problema con hasta 3 historias de usuario.

**2. Delimitar la solución**
  + El enfoque más sencillo para la aplicación, la lógica y la infraestructura.

**3. Criterios de aceptación**
  + Hasta 9 criterios de aceptación en formato EARS

## Checklist de salida
- [ ] La salida debe ser un archivo markdown llamado `specs/restaurants.spec.md`

- [ ] La especificación con:
  + Descripción del problema,
  + Descripción general de la solución,
  + Criterios de aceptación.

