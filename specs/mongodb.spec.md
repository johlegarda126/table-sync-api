# Especificación de conexión a MongoDB
## Descripción del problema
- Como desarrollador de backend, quiero configurar la conexión a MongoDB usando variables de entorno para mantener las credenciales seguras y permitir despliegues flexibles.
- Como operador de la API, quiero que la aplicación use `MONGODB_URI`, `API_USER`, `API_PASSWORD`, `JWT_SECRET` y `PORT` desde un archivo `.env` para separar la configuración del código.
- Como equipo de desarrollo, quiero habilitar una base de datos persistente en MongoDB para que los datos de mesas y reservas no se pierdan al reiniciar el servidor.
## Descripción general de la solución
- Añadir soporte para la carga de configuración desde `.env` usando `dotenv`.
- Usar `mongoose` para inicializar la conexión a MongoDB con la URI definida en `MONGODB_URI`.
- Configurar la integración de la base de datos dentro de `src/modules/tables/` para que las tablas y reservas interactúen con MongoDB.
- Validar que las variables requeridas estén presentes antes de arrancar el servidor.
## Criterios de aceptación
- [ ] Cuando la aplicación arranca, carga `MONGODB_URI`, `API_USER`, `API_PASSWORD`, `JWT_SECRET` y `PORT` desde `.env` usando `dotenv`.
- [ ] Si falta alguna variable requerida, la aplicación no inicia y muestra un error claro.
- [ ] La conexión a MongoDB se inicializa con `mongoose` usando la URI de `MONGODB_URI`.
- [ ] La configuración de la base de datos está integrada en `src/modules/tables/` para que las operaciones de mesas y reservas usen MongoDB.
- [ ] El servidor se inicia en el puerto definido por `PORT` si todas las variables están presentes.
- [ ] La solución soporta la conexión a MongoDB Atlas usando la URI provista.
- [ ] Las credenciales `API_USER` y `API_PASSWORD` están definidas en `.env` para futuras capas de seguridad.
- [ ] `JWT_SECRET` está disponible en `.env` para proteger la generación de tokens.
- [ ] La implementación documenta claramente las variables de entorno requeridas y su propósito.
