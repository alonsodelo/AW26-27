# AW26-27
Proyecto AW 2026-2027

# Proyecto Centro de Formación - AW 26/27

Repositorio de la práctica de Aplicaciones Web. Incluye la parte estática del frontend y la configuración inicial del backend con Node.js y Express.

## Organización de carpetas

- `public/`: contiene todo el frontend (archivos HTML, hojas de estilo CSS y scripts de cliente).
- `routes/`: módulos con las rutas del servidor Express (`api.js` y `view.js`).
- `app.js`: prueba de servidor básico hecha directamente con el módulo nativo `node:http`.
- `main.js`: servidor principal montado con Express para servir la web y la API.
- `package.json` y `package-lock.json`: configuración del proyecto, scripts y dependencias.

## Instalación

Para descargar las dependencias necesarias (Express) antes de arrancar el proyecto, abrir una terminal en la carpeta raíz y ejecutar:

```bash
npm install
```

## Cómo ejecutar el servidor

Hay varios scripts configurados en el `package.json` según lo que se quiera lanzar (todos escuchan en `http://localhost:3000`):

- **Arrancar el servidor con Express (recomendado para ver la web):**
  ```bash
  npm run express
  ```

- **Arrancar el servidor básico de Node (`app.js`):**
  ```bash
  npm start
  ```
  También se puede lanzar con `npm run dev` para que se reinicie solo al guardar cambios.