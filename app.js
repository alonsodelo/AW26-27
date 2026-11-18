import { createServer } from 'node:http';

const PORT = 3000;

const servidor = createServer((req, res) => {
  console.log(`Petición recibida: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>¡Hola! El backend con Node.js, para ver si funciona </h1>');
});

servidor.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});