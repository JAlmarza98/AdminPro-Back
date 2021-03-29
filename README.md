# Web server + Rest server
---

Web Server + REST Server basado en clases para el proyecto AdminPro.

Escrito en NodeJs y usando MongoDB como base de datos

Consta de:
- CRUD de usuarios.
- CRUD de hospitales.
- CRUD de medicos.
- Metodo de Login propio.
- Autenticacion por Google.
- Todas las validaciones de seguridad pertinentes.
- Sistema de baneo de Usuarios.
- Autenticacion de usuarios mediante JSON Web Token.
- Metodos GET paginados.
- Sistema de permisos basado en roles.
- Sistema de busqueda tanto global como especifica.
- Subida de archivos y proteccionde los mismos.

## Configuracion

Configurar variables de entorno del archivo *.env*

Para instalar las dependencias.

```npm install```

## Inicio

Iniciar modo de desarrollo:
``` npm run start:dev ```

Levantar el servicio:
``` npm start ```
