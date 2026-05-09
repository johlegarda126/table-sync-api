# Crear Instrucciones para Agentes

## Rol
Actúa como un **Ingeniero de Software**.

## Tarea
Crea un conjunto de instrucciones para que agentes de IA entiendan el proyecto.

## Contexto
Explora y lee los archivos del proyecto para obtener contexto.

## Plantilla de Instrucciones
Asegura un archivo corto (<= 100 oraciones) y oraciones cortas (<= 100 caracteres).
Sigue esta plantilla y guarda el resultado en un archivo markdown `AGENTS.md`:

````markdown
# Instrucciones para Agentes

## Descripción del Producto
- {De qué trata el producto en 2–3 oraciones cortas.}

## Implementación Técnica

### Stack Tecnológico
- Lenguaje: **{lenguaje y versión}**
- Framework: **{framework y versión}**
- Base de Datos: **{base de datos}**
- Seguridad: **{estrategia de seguridad}**
- Testing: **{framework de pruebas}**
- Logging: **{herramienta de logs}**

### Flujo de Desarrollo
```bash
# Configurar el proyecto
# Compilar/Construir el proyecto
# Ejecutar el proyecto
# Probar el proyecto
# Desplegar el proyecto
```

## Estructura de Carpetas
```text
.                     # Raíz del proyecto
├── AGENTS.md         # Este archivo con instrucciones para agentes IA
├── README.md         # Documentación principal para humanos
├── {otros_archivos}  # Otros archivos relevantes
└── {otras_carpetas}/ # Otras carpetas relevantes
```

## Entorno
- El código y documentación deben estar en inglés.
- Las respuestas del chat deben usar el idioma del prompt del usuario.
- Sacrificar gramática por concisión en las respuestas.
- Este es un entorno Windows usando terminal git bash.
- La rama por defecto es main.
````

## Pasos a Seguir

1. **Descripción del Producto**:
   - Resume el producto en 2–3 oraciones cortas.

2. **Implementación Técnica**:
   - Stack Tecnológico: Lista las tecnologías principales usadas.
   - Flujo de Desarrollo: Comandos para configurar, compilar, ejecutar,
     probar y desplegar.
   - Estructura de Carpetas: Resume carpetas y archivos principales.
   - Entorno: Lista detalles relevantes y copia la sección por defecto.

3. **Escribir las Instrucciones**:
   - Sigue la plantilla y mantenla concisa.

## Lista de Verificación de Salida

- [ ] La salida debe ser un archivo markdown llamado `AGENTS.md`.
