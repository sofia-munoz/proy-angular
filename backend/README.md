# Proyecto Backend

Este proyecto es un servidor backend basado en Node.js y Express que proporciona una API para gestionar diferentes recursos relacionados con un sistema de gestión deportiva. 
Permite el manejo de usuarios, alumnos, planes, personal administrativo, entrenadores, pagos y encargados.

## Descripción

El servidor está construido con Express, utilizando middlewares como express.json() para el manejo de datos en formato JSON y cors() para permitir el acceso desde http://localhost:4200.
Se utilizan módulos de dirección de rutas correspondientes a diferentes recursos: usuario, alumno, plan, administrativo, entrenador, pago y encargado.

## Configuración y Ejecución
Asegúrate de tener Node.js y npm instalados en tu sistema.

1. Clona el repositorio en tu máquina local:

  `git clone https://github.com/tu-usuario/proybackendgrupo07.git`
  
   `cd proybackendgrupo07`

2. Instala las dependencias:

  `npm install`

3. Configura la base de datos:
   
Edita el archivo database.js y establece la URI de conexión a la base de datos MongoDB.

4. Inicia el servidor en modo de desarrollo:

  `npm run dev`

  El servidor se ejecutará en el puerto especificado o en el puerto 3000 por defecto.

 ## Estructura del Proyecto
- **index.js**: Archivo principal que configura y ejecuta la aplicación Express.
- **database.js**: Configuración y conexión a la base de datos MongoDB.
- **routers/**: Directorio que contiene los archivos de enrutamiento para cada recurso (usuario, alumno, plan, administrativo, entrenador, pago, encargado).

## Tecnologías Utilizadas
- **Express.js**: Framework para Node.js que permite crear aplicaciones web y APIs de manera sencilla y rápida.
- **Cors**: Middleware para Express que habilita el control de acceso HTTP.
- **Mongoose**: ODM (Object Document Mapper) para MongoDB, facilita la interacción con la base de datos.
- **Bcrypt**: Librería para el hashing seguro de contraseñas.
- **JsonWebToken**: Implementación de JSON Web Tokens para autenticación.
   **MercadoPago**: SDK para integrar pagos con MercadoPago.
- **Nodemailer**: Librería para enviar correos electrónicos desde Node.js.

