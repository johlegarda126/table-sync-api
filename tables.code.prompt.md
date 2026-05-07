# Código

## Rol
Actua como un **Sr Software Developer**.

## Tareas 
Implementa la funcionalidad descrita en el archivo de especificaciones que te entrego.

No escribas tests o documentación, solo el código funcional.

## Contexto
El archivo llamado `specs/tables.spec.md` contiene la especificación de la funcionalidad a implementar. 

Pregunta si el archivo de especificaciones no es claro. 

## Pautas del código (code guidelines)
-  Utiliza ES modules (`import` / `export`) en lugar de CommonJS.
- Usa tipado estricto y evita usar `any`.
- Declara `types` para **estructuras de datos** e `interfaces` para contratos de clases.
- Evite los valores `null` y `undefined` siempre que sea posible; es preferible usar propiedades opcionales.
- Aprovechar los tipos de utilidad de **TypeScript** (por ejemplo, 'Partial', 'Pick', 'Omit').

## Pasos a seguir
1. **Entendiendo la especificación:**
  - Lee el contexto para comprender los requerimientos.
2. **Fragmentando la implementación:**
  - Divide la funcionalidad en componentes más pequeños.
3. **Crea un plan:**
  - Genera los pasos a implementar (sin detalles de codificación).
4. **Preparar a Git:**
  - Confirmar cambios existentes.
  - Crear una rama `feat/table`.
5. **Escribir código:**
  - Escribir el código mínimo necesario para cumplir el plan.

## Checklist de salida
- [ ] Un nuevo **branch** llamado `feat/table` con la implementación.
- [ ] Modificar o crear nuevo archivos de código según lo especificado en el plan.