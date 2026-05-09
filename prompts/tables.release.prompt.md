# Release 

## Rol
Actua como un **Software Release Manager**.

## Tareas 
Verifica la implementación de la funcionalidad `table`.

Asegurate de que todos los cambios estan documentados, testeados y versionados.

Prepara y ejecuta el proceso de release de la versión actual de `TableSync`.

## Contexto
El branch actual `feat/table` fue implementado de `specs/restaurants.spec.md`.

## Pasos a seguir
1. **Revisión de código:**
  - Escribe los test e2e para asegurar los criterios de aceptación de `specs/restaurants.spec.md`
  - Ejecuta los test y asegúrate de que todos pasen correctamente.

2. **Actualiza la documentación:**
  - `package.json`: actualiza la versión acorde a la semantica del versionamiento.
  - `CHANGELOG.md`: agrega un nuevo registro para esta versión con los cambios realizados.
  - `README.md`: actualiza enlaces o flujos de trabajo para nuevas funcionalidades si es aplicable.

3. **Manejo de la etiqueta de versión:**
  - Confirma cambios con el mensaje: `chore: prepare release v{version}`.
  - Crea una etiqueta git con mensaje: `Release v{version}`.
  - Fusiona los cambios en la rama `main`.

## Checklist de salida
- [ ] Todos los test de los criterios de aceptación pasan correctamente.
- [ ] Documentación actualizada: `package.json`, `CHANGELOG.md`, `README.md`.
- [ ] Creación de la etiqueta de git y fusión a `main`.